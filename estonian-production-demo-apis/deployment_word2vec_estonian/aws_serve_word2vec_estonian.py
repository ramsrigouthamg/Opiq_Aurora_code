import flask
from flask import request, jsonify
from flask_cors import CORS
from collections import OrderedDict
from estnltk import Text
from estnltk.wordnet import wn
from estnltk import analyze
from estnltk import synthesize
import requests
import pprint
# http://ec2-13-250-109-16.ap-southeast-1.compute.amazonaws.com:5000/getsimilarword?word=%C3%B5petaja
# https://www.online-toolz.com/tools/text-unicode-entities-convertor.php
# https://www.colanguage.com/derivatives-estonian
# https://estnltk.github.io/estnltk/1.1/tutorials/morf_analysis.html
# https://github.com/Filosoft/vabamorf/blob/master/doc/tagset.html
# http://estonianlanguage.blogspot.com/2010/04/estonian-locative-cases.html

# Test with this word:
# sentence = "Palju vajatakse suspensioone ehitustegevuses."
# word = "ehitustegevuses"
#  The synonym words should be: 'Kindlustustegevuses', 'Õõnestustegevuses', 'arendustegevus', 'jälitustegevus', 'tootmistegevus'

import time
import string
import gensim.models.keyedvectors as word2vec

app = flask.Flask(__name__)
# app.config["DEBUG"] = True
CORS(app)
# {'VERB': 'v', 'ADJ': 'a', 'NOUN': 'n', 'ADV': 'b'}
pos_mapping ={"A": "a",
              "C": "a",
              "D": "b",
              "G": "a",
              "H": "n",
              "I":  None,
              "J":  None,
              "K":  None,
              "N": "NUM",
              "O": "n",
              "P":  None,
              "S": "n",
              "U": "a",
              "V": "v",
              "X": "b",
              "Y": "n",
              "Z": None}

pos_mapping_readable = {"A": "Adjective",
              "C": "Adjective",
              "D": "Adverb",
              "G": "Adjective",
              "H": "NOUN_Proper_name Eg: Edgar",
              "I":  None,
              "J":  None,
              "K":  None,
              "N": "NUM",
              "O": "NOUN_Ordinal_number Eg: Second",
              "P":  None,
              "S": "NOUN_Thing_common_noun",
              "U": "Adjective",
              "V": "VERB",
              "X": "Adverb",
              "Y": "NOUN_Abbreviation Eg: USA",
              "Z": None}

start = time.time()
word2vec_model = word2vec.KeyedVectors.load_word2vec_format('wiki.et.vec')
end1 = time.time()
print ("Time Elapsed to load wiki word2vec ",end1-start)

def get_wordnet_distractors(keyword,sent):
    text = Text(sent)
    word_lower = Text(keyword).lower().text
    dataframe = text.get.word_texts.lemmas.postags.postag_descriptions.as_dict
    #print ("dataframe ",dataframe)
    word_index = dataframe["word_texts"].index(word_lower)
    pos_tag = dataframe["postags"][word_index]
    pos_final = pos_mapping[pos_tag]

    print("pos  ", pos_final, " ,Estonian tag: ", pos_tag)
    if pos_final is not None and pos_final != "NUM":
        sets = wn.synsets(word_lower, pos=pos_final)
        print("initial synsets ", sets)
        if len(sets) == 0:
            lemma = dataframe["lemmas"][word_index]
            lemma_text = Text(lemma)
            lemma_lower = Text(lemma_text).lower().text
            sets = wn.synsets(lemma_lower, pos=pos_final)
            print("modified synsets ", sets)
    else:
        sets = wn.synsets(word_lower)

    distractors=[]
    for syn in sets[:1]:
        # print (syn)
        # print(syn.name)
        # print(syn.pos)
        # print (syn.definition())
        hypernyms = syn.hypernyms()
        for hypenym in hypernyms:
            for hyponym in hypenym.hyponyms():
                if hyponym.name not in distractors:
                    distractors.append(hyponym.name.split(".")[0])

    # print ("wordnet distractors ",distractors)
    if word_lower in distractors:
        distractors.remove(word_lower)
    return distractors

def get_lemma_and_root_word(wrd,analysis):
    lemmas_roots =[]
    for val in analysis:
        est_punctuation = '„”'
        temp = val["text"].lower()
        temp = temp.strip(string.punctuation + est_punctuation)
        if temp == wrd.lower():
            # print (val)
            # print(val["analysis"][0])
            analysis = val["analysis"][0]
            lemmas_roots.append(analysis["lemma"])
            root_tokens = analysis["root_tokens"]
            root = analysis["root"].replace("=","_").split("_")
            if len(root_tokens) > 0:
                lemmas_roots.append(root_tokens[0])
            if len(root) > 0:
                lemmas_roots.append(root[0])

    lemmas_roots = list(set(lemmas_roots))
    return lemmas_roots

def get_lemmas(filtered_words,originalword,originalsentence):
    out ={}
    out[originalword] = None
    analyze_output = analyze(originalsentence)
    lemmas_and_roots =get_lemma_and_root_word(originalword,analyze_output)
    unique_lemma_words=[]
    extra_lemma_words =[]
    for word in filtered_words:
        text = Text(word)
        try:
            lemma_word = text.roots[0]
            lemma_word = lemma_word.split("|")[0]
            if lemma_word not in out:
                out[lemma_word]=None
                if any(new_word.lower() in lemma_word.lower() for new_word in lemmas_and_roots):
                    extra_lemma_words.append(word)
                else:
                    unique_lemma_words.append(word)
            else:
                extra_lemma_words.append(word)
        except:
            print ("error for lemma word",word)
        # out[word] = lemma_word
    return unique_lemma_words,extra_lemma_words,lemmas_and_roots

def remove_punctuation_words(wordlist):
    out=[]
    for each in wordlist:
        est_punctuation='„”'
        temp = each
        temp = temp.strip(string.punctuation + est_punctuation)
        if len(temp) == len(each):
            out.append(each)
    return out

def filter_words(word, origsentence, model, stats):
    output = {"similar": [], "synonyms": []}

    unique_words = []

    if word.lower() in model.vocab:
        print("using the wordvec for word ", word.lower())
        similar_words = model.most_similar(word.lower(), topn=200)
    else:
        analyze_output_temp = analyze(origsentence)
        lemma_words = get_lemma_and_root_word(word, analyze_output_temp)
        for each_one in lemma_words:
            if each_one in model.vocab:
                print("using the wordvec for word ", word)
                similar_words = model.most_similar(each_one, topn=200)
                break

    # print ("similar_words ",similar_words)
    for each_word in similar_words:
        current_word = each_word[0]
        unique_words.append(current_word.lower())
    unique_words = list(OrderedDict.fromkeys(unique_words))

    # print ("unique_words ",unique_words)
    # Remove punctuation
    unique_words = remove_punctuation_words(unique_words)

    for unique_word in unique_words:
        if word.lower() in unique_word or unique_word.startswith(stats['root']):
            # unique_word = unique_word.title()
            output["similar"].append(unique_word)
        else:
            # unique_word = unique_word.title()
            output["synonyms"].append(unique_word)

    # text = Text(word)
    # original_word = text.lemmas[0]
    # original_word = original_word.split("|")[0]

    syn, sim, lemma_and_root = get_lemmas(output["synonyms"], word, origsentence)
    output["synonyms"] = syn
    output["similar"].extend(sim)
    output["lemma"] = lemma_and_root
    # pprint.pprint(lemmas)

    return output

def return_word_stats(keyword_in,sent):
    out={"POS":None,"form":None,"lemma":None,"ending":None,"root":None,"root_tokens":None}
    analyze_output_current = analyze(sent)
    for val in analyze_output_current:
        est_punctuation = '„”'
        temp = val["text"].lower()
        temp = temp.strip(string.punctuation + est_punctuation)
        if temp == keyword_in.lower():
            analysis = val["analysis"][0]
            out["POS"] = analysis["partofspeech"]
            out["form"] = analysis["form"]
            out["ending"] = analysis["ending"]
            out["lemma"] = analysis['lemma'].split("|")[0]
            out["root"] = analysis["root"]
            out["root_tokens"] = analysis["root_tokens"]
            break
    return out

def match_pos(original_pos,current_word_pos):
    noun_list = ['H','O','S','Y']
    adj_list = ['A','C','G','U']
    verb_list = ['V']
    adverb_list = ['D','X']
    if current_word_pos == original_pos:
        return True
    if original_pos in noun_list and current_word_pos in noun_list:
        return True
    if original_pos in adj_list and current_word_pos in adj_list:
        return True
    if original_pos in verb_list and current_word_pos in verb_list:
        return True
    if original_pos in adverb_list and current_word_pos in adverb_list:
        return True
    return False

def filter_words_on_pos(stats,output_list):
    original_word_pos = stats["POS"]
    diff=[]
    same=[]
    for word in output_list:
        word_pos = Text(word).tag_analysis().postags[0]
        if match_pos(original_word_pos,word_pos):
            same.append(word)
        else:
            diff.append(word)
    return diff,same

def change_tense(value_dict):
    morphed_distractors =[]
    morphed_word_pairs=[]
    ending = value_dict["ending"]
    if ending == "0":
        morphed_distractors = value_dict
        return morphed_distractors["synonyms"],morphed_word_pairs
    print ("ending ",ending)
    for val in value_dict["synonyms"]:
        if val.endswith(ending):
            morphed_distractors.append(val)
        else:
            text = Text(val)
            lemma_word = text.lemmas[0]
            lemma_word = lemma_word.split("|")[0]
            lemma_word=lemma_word.capitalize()
            transformed_word = synthesize(lemma_word, form=value_dict["form"],partofspeech=value_dict["POS"])
            if len(transformed_word) ==0:
                morphed_distractors.append(val)
            else:
                if transformed_word[0].capitalize() not in morphed_distractors:
                    morphed_distractors.append(transformed_word[0].capitalize())
                if not val==lemma_word==transformed_word[0].capitalize():
                    morphed_word_pairs.append((val,lemma_word,transformed_word[0].capitalize()))

    return morphed_distractors,morphed_word_pairs

def order_by_ending(final_synonymns,output):
    ending = output["ending"]
    break_index = 15
    if ending=="0":
        return final_synonymns
    else:
        print ("more processing with ending ",ending)
        root_tokens = output["root_tokens"]
        word = output["word"]
        if (len(root_tokens)>1):
            last_word  = root_tokens[-1]
            index = word.find(last_word)
            ending = word[index:]
        print ("ending_word ",ending)
        part1 = sorted(final_synonymns[:break_index], key=lambda x: x.endswith(ending), reverse=True)
        part2 = final_synonymns[break_index:]
        return part1+part2

def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False

def process_word(number):
    URL = "http://52.221.217.168:5000/getsimilarword"
    PARAMS = {'word':number}
    r = requests.get(url = URL, params = PARAMS)
    data = r.json()
    filter_synonyms =[]
    for val in data['synonyms']:
        if is_number(val):
            filter_synonyms.append(val)
    data['synonyms'] = filter_synonyms
    return data


@app.route('/', methods=['GET'])
def home():
    return '''<h1>Get word vectors for a word in estonian</h1>
<p>A API for getting similar words for a given word. <br> Call it with query parameters like: http://13.229.202.179/getsimilarword?word=africa </p>'''


@app.route('/getdistractors',methods=['GET', 'POST'])
def distractors():
    if request.method == 'POST':
        data = request.get_json()
        word = data["word"]
        sentence = data["sentence"]
        print("data ", data)

        if is_number(word):
            output = process_word(word)
            output["word"]=word
            print(output["synonyms"])
        else:
            word_stats = return_word_stats(word,sentence)
            output_initial = filter_words(word,sentence, word2vec_model,word_stats)
            diff_pos, same_pos = filter_words_on_pos(word_stats, output_initial["synonyms"])
            output_initial["synonyms"] = same_pos
            output_initial["diff_pos"] = diff_pos
            pos = word_stats["POS"]
            pos_readable = pos_mapping_readable[pos]
            output_initial["POS_readable"] = pos_readable
            output_initial["word"] = word
            output = {**word_stats,**output_initial}
            # output_wordnet = get_wordnet_distractors(word,sentence)
            # temp = output_wordnet[:15] + output["synonyms"][:25]
            # temp = output["synonyms"][:50]
            tense_changed_words, pairs = change_tense(output)
            output["synonyms"] = order_by_ending(tense_changed_words[:35], output)
            output["morphed_pairs"]=pairs

    else:
        return "Error: No text field provided. Please specify a text."

    return jsonify(output)

if __name__=='__main__':
    app.run(host="0.0.0.0",debug= False)

# Need to be resolved issues
# Build a word misspelling checker to filter out those words.
# See if there is match/overlap in the end and show only those words. Remove words with overlap in the beginning.