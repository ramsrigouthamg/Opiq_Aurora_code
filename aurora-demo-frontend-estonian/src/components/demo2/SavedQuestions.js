import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink
} from '@react-pdf/renderer';
import * as docx from 'docx';
// const fontSrc = require('./../../assets/Lato-Regular.ttf');

export default class SavedQuestions extends React.Component {
  render() {
    const { savedQuestions } = this.props.location.state;

    const indexMap = {
      0: 'a',
      1: 'b',
      2: 'c',
      3: 'd'
    };

    // generateDoc(savedQuestions, indexMap);

    // Create Document Component
    const MyDoc = _ => {
      return savedQuestions ? (
        <Document>
          <Page size='A4' style={styles.page}>
            <View style={styles.section}>
              {savedQuestions.map((el, i) => (
                <View wrap={false} key={el.question} style={styles.card}>
                  <Text style={styles.card_head}>
                    {i + 1}. {el.question}
                  </Text>
                  <View style={styles.card_body}>
                    {el.options.map((option, j) => (
                      <Text key={option.value}>
                        {indexMap[j]}. {option.value}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      ) : null;
    };

    return (
      <div className='saved_container'>
        <div className='title_wrapper'>
          <div className='title'>
            Your Saved <span>Questions</span>
          </div>
          <div className='buttons'>
            <div className='button'>Download</div>
            <div className='menu'>
              <div
                className='menu_item'
                onClick={_ => generateDoc(savedQuestions, indexMap)}
              >
                As word
              </div>
              <PDFDownloadLink
                document={savedQuestions ? <MyDoc /> : null}
                fileName='questions.pdf'
              >
                {({ blob, url, loading, error }) => (
                  <div className='menu_item'>
                    {loading ? 'Loading' : 'As PDF'}
                  </div>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </div>
        {savedQuestions.map((el, i) => (
          <div key={el.question} className='card'>
            <div className='card_head'>
              {i + 1}. {el.question}
            </div>
            <div className='card_body'>
              <ul>
                {el.options.map(option => (
                  <li key={option.value}>{option.value}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

// Font.register({
//   family: 'Lato',
//   src: fontSrc
// });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  card: {
    margin: 20
  },
  card_head: {
    fontSize: 12,
    fontWeight: 'lighter',
    marginBottom: 5
  },
  card_body: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: 'lighter'
    // fontFamily: 'Lato'
  }
});

const generateDoc = (questions, indexMap) => {
  const doc = new docx.Document({
    creator: 'QGen',
    title: 'Saved Questions'
  });

  // const text = new docx.TextRun('Hello World').font('Montserrat').size(26);
  // const paragraph = new docx.Paragraph();
  // paragraph.addRun(text);
  // doc.addParagraph(paragraph);

  questions.forEach((el, i) => {
    const para = new docx.Paragraph().spacing({
      before: 500,
      after: 500
    });
    para.addRun(
      new docx.TextRun(`${i + 1}. ${el.question}`)
        .font('Verdana')
        .size(25)
        .color('#2b2b2b')
    );
    para.addRun(new docx.TextRun('').break());
    doc.addParagraph(para);
    el.options.forEach((opt, i) => {
      const text = new docx.TextRun(` ${indexMap[i]}. ${opt.value}`)
        .font('Verdana')
        .size(23)
        .color('#2b2b2b')
        .break();
      para.addRun(text);
    });
  });

  const packer = new docx.Packer();
  packer.toBlob(doc).then(blob => {
    saveAs(blob, 'questions.docx');
  });
};

const saveAs = (blob, name) => {
  let link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = name;
  document.body.appendChild(link);
  link.style.display = 'none';
  link.click();
  link.remove();
  window.URL.revokeObjectURL(link.href);
};
