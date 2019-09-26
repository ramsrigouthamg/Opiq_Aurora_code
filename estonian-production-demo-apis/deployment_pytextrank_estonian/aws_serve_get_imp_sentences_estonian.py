
from flask import Flask, request, jsonify
from flask_cors import CORS
import networkx as nx
import traceback
import time

app = Flask(__name__)
CORS(app)

import numpy as np
import pandas as pd
import nltk

nltk.download('punkt')

import re
from nltk.tokenize import sent_tokenize
from sklearn.metrics.pairwise import cosine_similarity

# Extract word vectors
word_embeddings = {}
dimension = 0
with open('wiki.et.vec', encoding='utf-8') as f:
    first_line = f.readline()
    dimension = int(first_line.split()[-1])
    print (first_line)
    for line in f:
        values = line.split()
        word = values[0]
        #print (word)
        try:
            coefs = np.asarray(values[1:], dtype='float32')
            assert(len(values[1:])==300)
            word_embeddings[word] = coefs
        except:
            print ("Skipping a word")

stop_words = set(line.strip() for line in open('stopwords-et.txt'))
# function to remove stopwords
def remove_stopwords(sen):
    sen_new = " ".join([i for i in sen if i not in stop_words])
    return sen_new


def tokenize_sentences(text):
    sentences = [sent_tokenize(text)]
    sentences = [y for x in sentences for y in x]
    sentences = [sentence.strip() for sentence in sentences if len(sentence) > 20]
    return sentences


def preprocess_sentences(sentences):
    # remove punctuations, numbers.
    clean_sentences = pd.Series(sentences).str.replace("[.!?\\-]", " ")
    clean_sentences = pd.Series(clean_sentences).str.replace("^\d+\s|\s\d+\s|\s\d+$", " ")
    # make alphabets lowercase
    clean_sentences = [s.lower() for s in clean_sentences]
    # remove stopwords from the sentences
    clean_sentences = [remove_stopwords(r.split()) for r in clean_sentences]
    return clean_sentences

def get_sentence_vectors(sentences):
    sentence_vectors = []
    for i in sentences:
        if len(i) != 0:
            v = sum([word_embeddings.get(w, np.zeros((dimension,))) for w in
                     i.split()]) / (len(i.split()) + 0.001)
        else:
            v = np.zeros((dimension,))
        sentence_vectors.append(v)
    return sentence_vectors

def get_scores(sentences,sentence_vectors):
    # similarity matrix
    sim_mat = np.zeros([len(sentences), len(sentences)])
    for i in range(len(sentences)):
        for j in range(len(sentences)):
            if i != j:
                sim_mat[i][j] = cosine_similarity(sentence_vectors[i].reshape(1, dimension), sentence_vectors[j].reshape(1, dimension))[0, 0]

    nx_graph = nx.from_numpy_array(sim_mat)
    scores = nx.pagerank(nx_graph)
    return scores

def get_important_sentences(text):
    sentences = tokenize_sentences(text)
    preprocessed_sentences = preprocess_sentences(sentences)
    sentence_vectors = get_sentence_vectors(preprocessed_sentences)
    sentence_scores = get_scores(sentences,sentence_vectors)
    ranked_sentences = sorted(((sentence_scores[i], s) for i, s in enumerate(sentences)), reverse=True)

    n_sentences = int(np.ceil(len(ranked_sentences) ** 0.5))
    output =[]
    # Extract top n sentences as the summary
    for i in range(n_sentences):
        output.append(ranked_sentences[i][1])
    return output

def get_json_keywords_for_phrase(sentence):
    output = {"text": sentence, "keywords": [],"tags":[]}
    return output

@app.route('/', methods=['GET'])
def home():
    return '''<h1>Return Questions</h1>
<p>A prototype API for sending Estonian text and getting important sentences back. Call with post request { "text": "content"} </p>'''


@app.route('/getquestions', methods=['GET', 'POST'])
def get_questions():
    if request.method == 'POST':
        data = request.get_json()
        text = data["text"]
        print("data ", data)
        text = text.replace('\n', ' ')
        phrases = get_important_sentences(text)

        final_output = {"questions": []}


        for phrase in phrases:
            out = get_json_keywords_for_phrase(phrase)
            final_output["questions"].append(out)

    else:
        return "Error: No text field provided. Please specify a text."

    return jsonify(final_output)


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=False)

