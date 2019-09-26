import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import anime from "animejs";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import { getRandom } from "../utils";
import Options from "./Options";
import WrongOptions from "./WrongOptions";
const spinner = require("./../../assets/spinner.svg");

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      question_no: 1,
      options: [],
      editMode: null,
      savedQuestions: [],
      chosenQuestion: "",
      loading: true,
      wrongOptions: [],
      chooseMode: false
    };
  }

  componentDidMount = () => {
    const payload = this.props.location.state;
    const url =
      "http://ec2-3-0-102-216.ap-southeast-1.compute.amazonaws.com:5000/getquestions";
    //      "http://ec2-3-0-54-226.ap-southeast-1.compute.amazonaws.com:5000/getquestions";
    axios
      .post(url, JSON.stringify(payload), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        this.setState({
          questions: res.data.questions,
          loading: false
        });
      });
  };

  componentWillUnmount = () => {
    document.querySelectorAll(".result_container #name").forEach(el => {
      el.removeEventListener("click", _ =>
        console.log("removed event listener")
      );
    });
  };

  onEdit = index => _ => {
    const { keywords, text } = this.state.questions[index];
    this.setState({ sentence: text });
    var ntext = text;
    let newText = ntext;
    //commenting out for now
    //ntext = ntext.replace(/[^a-zA-Z0-9_ÄÖÕÜŠŽäöõüšž ]/g, " ");
    ntext = ntext
      .split(/([().]|[a-zA-Z0-9_ÄÖÕÜŠŽäöõüšž]+)/)
      .filter(function(e) {
        return e.trim().length > 0;
      });

    for (var i = 0; i < ntext.length; i++) {
      ntext[i] = `<span id="name" >${ntext[i]}</span> `;
    }
    newText = ntext.join("");
    document.querySelector(".result_container .question").innerHTML = newText;

    this.onWordSelect();
  };

  onWordSelect = () => {
    const { questions, question_no } = this.state;
    document.querySelectorAll(".result_container #name").forEach(el => {
      el.addEventListener("click", e => {
        const text = e.target.innerText;
        let payload = {
          sentence: this.state.sentence,
          word: text
        };

        axios
          .post(
            "http://ec2-13-250-109-16.ap-southeast-1.compute.amazonaws.com:5000/getdistractors",
            JSON.stringify(payload),
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then(res => {
            let options = [],
              newText;
            const syn = res.data.synonyms.length
              ? res.data.synonyms.slice(0, 3)
              : new Array(3).fill("Enter value");
            syn.push(text.charAt(0).toUpperCase() + text.slice(1));
            newText = " " + questions[question_no - 1].text;
            const random = getRandom();
            random.forEach((el, i) => {
              options[el] = {
                id: el,
                value: syn[i++],
                correct: syn[i - 1].toLowerCase() === text.toLowerCase()
              };
            });
            // eslint-disable-next-line no-useless-escape
            const regex = new RegExp(` ${text}[^a-zA_Z0-9]`, "g");
            newText = newText.replace(regex, x => {
              if (/[^a-zA-Z0-9]/.test(x[x.length - 1]))
                return ` ${"_".repeat(text.length)}${x[x.length - 1]}`;
              return ` ${"_".repeat(text.length)} `;
            });
            document.querySelector(
              ".result_container .question"
            ).innerHTML = newText;
            const savebtn = document.querySelector(".save-btn");
            if (savebtn) savebtn.disabled = false;
            const wrongOptions = [];
            res.data.synonyms.slice(3).forEach((el, i) => {
              wrongOptions.push({ id: i, value: el });
            });
            this.animate({
              chosenQuestion: newText,
              options,
              wrongOptions
            });
          });
      });
    });
  };

  nextQues = e => {
    const { question_no, questions } = this.state;
    if (question_no === questions.length) {
      e.target.classList.add("no_more");
      e.target.innerHTML = "No More Questions";
      return;
    }
    const new_question_no = question_no + 1;
    this.animate({
      question_no: new_question_no,
      options: []
    });
  };

  onOptionEdit = id => _ => {
    this.setState({
      editMode: id
    });
  };

  onOptionSave = e => {
    const { options, editMode } = this.state;
    const value = e.target.parentNode.firstChild.value;
    if (!value) return;
    const index = options.findIndex(x => x.id === editMode);
    const newOption = {
      id: options[index].id,
      value,
      correct: options[index].correct
    };
    let newOptions = options;
    newOptions.splice(index, 1, newOption);
    this.setState(prevState => ({
      options: newOptions,
      editMode: null
    }));
  };

  saveQuestion = e => {
    const { chosenQuestion, options, savedQuestions } = this.state;
    const data = {
      question: chosenQuestion,
      options
    };
    if (savedQuestions.length === 0) {
      anime({
        targets: ".savedQuestions",
        opacity: [0, 1],
        scale: [0.8, 1],
        begin: () => {
          document.querySelector(".savedQuestions").style.display = "block";
        },
        duration: 600,
        easing: "easeOutExpo"
      });
    }
    this.setState({
      savedQuestions: this.state.savedQuestions.concat(data)
    });
    e.target.disabled = true;
  };

  animate = newState => {
    anime
      .timeline({
        easing: "easeOutExpo"
      })
      .add({
        targets: ".right_wrapper",
        opacity: [1, 0],
        scale: [1, 0.9],
        duration: 300,
        complete: () => {
          this.setState(newState);
        }
      })
      .add({
        targets: ".right_wrapper",
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 300
      });
  };

  chooseOtherOptions = e => {
    anime
      .timeline({
        easing: "easeOutExpo"
      })
      .add({
        targets: ".incorrect_options",
        opacity: 1,
        begin: () => {
          document.querySelector(".incorrect_options").style.display = "flex";
        },
        duration: 600
      })
      .add(
        {
          targets: ".incorrect_options .wrapper",
          opacity: [0, 1],
          translateY: [-50, 0]
        },
        "-=500"
      );
    this.setState({ chooseMode: true });
  };

  closeModal = _ => {
    anime
      .timeline({
        easing: "easeOutExpo"
      })
      .add({
        targets: ".incorrect_options .wrapper",
        opacity: [1, 0],
        translateY: [0, -50],
        duration: 300
      })
      .add(
        {
          targets: ".incorrect_options",
          opacity: 0,
          complete: () => {
            document.querySelector(".incorrect_options").style.display = "none";
          }
        },
        "-=200"
      );
    this.setState({ chooseMode: false });
  };

  handleDrop = (replace, replaced) => {
    this.setState(prevState => {
      const options = prevState.options;
      const wrongOptions = prevState.wrongOptions;
      options.splice(replaced.id, 1, {
        id: replaced.id,
        correct: false,
        value: replace.value
      });
      wrongOptions.splice(replace.id, 1, {
        id: replace.id,
        value: replaced.value
      });
      return {
        options
      };
    });
  };

  render() {
    const { text } = this.props.location.state;
    const {
      questions,
      question_no,
      options,
      editMode,
      savedQuestions,
      loading,
      wrongOptions,
      chooseMode
    } = this.state;
    // var selRange = selObj.getRangeAt(0);
    return (
      <div className="result_container">
        <div className="bg" />
        <div className="incorrect_options">
          <div className="fallback" onClick={this.closeModal} />
          <div className="wrapper">
            <div className="title">Drag and Drop</div>
            <ul>
              {wrongOptions.map(el => (
                <WrongOptions key={el.id} el={el} />
              ))}
            </ul>
          </div>
        </div>
        <div className="left">
          <div className="content">{text}</div>
        </div>
        {loading ? (
          <div className="spinner_wrapper">
            <img src={spinner} alt="" />
          </div>
        ) : (
          <div className="right">
            <Link
              to={{
                pathname: "/savedquestions",
                state: { savedQuestions }
              }}
            >
              <div className="savedQuestions">
                <img src={require("../../assets/save.svg")} alt="" />
              </div>
            </Link>
            <div className="right_wrapper">
              {questions.length > 0 && (
                <div className="question_wrapper">
                  <div className="question_no">
                    {question_no + "/" + questions.length}
                  </div>
                  <div className="question">
                    {questions[question_no - 1].text}
                  </div>
                  <div className="tags">
                    {questions[question_no - 1].tags.map(tag => (
                      <div key={tag} className="tag">
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className="button_wrapper">
                    <button
                      className="edit"
                      onClick={this.onEdit(question_no - 1)}
                    >
                      Edit
                    </button>
                    <button className="next" onClick={this.nextQues}>
                      Next Question
                    </button>
                  </div>
                </div>
              )}

              {options.length > 0 && (
                <div className="options_wrapper">
                  <ul>
                    {options.map((el, i) => (
                      <Options
                        key={el.id}
                        option={el}
                        editMode={editMode}
                        onOptionSave={this.onOptionSave}
                        onOptionEdit={this.onOptionEdit}
                        handleDrop={(replace, replaced) =>
                          this.handleDrop(replace, replaced)
                        }
                      />
                    ))}
                  </ul>
                  <div className="button_wrapper">
                    <button className="save-btn" onClick={this.saveQuestion}>
                      Save
                    </button>
                    <button
                      className="other-options"
                      onClick={this.chooseOtherOptions}
                      disabled={chooseMode}
                    >
                      Choose other options
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Result);
