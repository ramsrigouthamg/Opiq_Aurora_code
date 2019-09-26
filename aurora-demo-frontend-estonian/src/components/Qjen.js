import React, { Component } from "react";
import anime from "animejs";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import converter from "number-to-words";
import wordsToNumbers from "words-to-numbers";

class Qgen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: "",
      variables: [],
      res: "",
      variableRange: [],
      newQuesActive: false,
      equation: ""
    };
  }

  textareaChange = e => {
    e.target.classList.remove("error");
    this.setState({
      question: e.target.value
    });
  };

  onEquationChange = e => {
    e.target.classList.remove("error");
    this.setState({
      equation: e.target.value
    });
  };

  onsubmit = e => {
    const textarea = e.target.parentNode.firstChild.firstChild;
    const question = textarea.value.trim();
    if (!question) {
      textarea.classList.add("error");
      textarea.placeholder = "Please enter a question";
      return;
    }
    let variables = [],
      variableRange = [],
      i = 0;
    const res = this.state.question.replace(/\d+[,.]\d+|\d+/g, x => {
      variables.push({
        name: "var" + i++,
        value: x
      });
      variableRange.push({
        min: parseInt(x),
        max: 1000
      });
      return `<span id="digit" > ${x} </span>`;
    });
    this.setState({
      res,
      variables,
      variableRange
    });
    this.animateOut();
  };

  generateQues = _ => {
    const { variableRange, res, newQuesActive, equation } = this.state;
    const equDOM = document.querySelector(".right .equation");
    if (!equation) {
      equDOM.classList.add("error");
      return;
    }
    let newRes = res,
      newEquation = equation,
      values = {},
      answer,
      variables = [];

    for (let i = 0; i < variableRange.length; i++) {
      const { max, min } = variableRange[i];
      variables[i] = Math.floor(Math.random() * (max - min)) + min;
      newRes = newRes.replace(
        /\d+[,.]\d+|\d+/,
        converter.toWords(variables[i])
      );
      values[`var${i}`] = variables[i];
    }
    newEquation = newEquation.replace(/var\d/g, x => values[x]);
    try {
      // eslint-disable-next-line no-eval
      answer = eval(newEquation).toFixed(2);
      if (answer === "NaN") {
        equDOM.classList.add("error");
        equDOM.value = "Plese enter correct variables";
        return;
      }
    } catch (e) {
      equDOM.classList.add("error");
      equDOM.value = "Plese enter correct variables";
      return;
    }
    const newQues = document.querySelector(".newQues"),
      newAns = document.querySelector(".newAnswer");
    if (!newQuesActive) {
      anime
        .timeline()
        .add({
          targets: ".newEl",
          begin: () => {
            newQues.innerHTML = wordsToNumbers(newRes);
            newAns.innerHTML = answer;
            this.setState({ newQuesActive: true });
          },
          duration: 1000,
          padding: [0, "20px"],
          easing: "easeOutExpo",
          delay: anime.stagger(100)
        })
        .add({
          targets: ".generated",
          begin: () => {
            document.querySelector(".generated").style.display = "block";
          },
          opacity: [0, 1]
        });
    } else {
      newQues.innerHTML = wordsToNumbers(newRes);
      newAns.innerHTML = answer;
    }
  };

  onSliderChange = i => value => {
    let { variableRange } = this.state;
    variableRange.splice(i, 1, value);
    this.setState({
      variableRange
    });
  };

  animateOut() {
    const x = window.matchMedia("(min-width:1900px)");
    anime
      .timeline({
        easing: "easeOutExpo"
      })
      .add({
        targets: ".input_wrapper .btn",
        scale: [1, 0.6],
        opacity: [1, 0],
        duration: 500,
        complete: () => {
          document.querySelector(".input_wrapper .btn").style.display = "none";
        },
        begin: () => {
          document.querySelector(".res").innerHTML = this.state.res;
        }
      })
      .add(
        {
          targets: ".container .title",
          opacity: [1, 0]
        },
        "-=500"
      )
      .add(
        {
          targets: ".input_wrapper .question",
          translateY: x.matches ? "-20vh" : "-40vh"
        },
        "-=1000"
      )
      .add(
        {
          targets: ".question .variables",
          opacity: [0, 1],
          translateX: [-40, 0],
          duration: 500,
          begin: () => {
            document.querySelector(".question .variables").style.display =
              "block";
          }
        },
        "-=300"
      )
      .add(
        {
          targets: ".right .rightEl",
          opacity: [0, 1],
          translateY: [-50, 0],
          delay: anime.stagger(100)
        },
        "-=300"
      );
  }

  render() {
    return (
      <div className="container">
        <div className="left">
          <div className="title">Q Gen</div>
          <div className="input_wrapper">
            <div className="question">
              {!!this.state.res ? (
                <div className="result res" />
              ) : (
                <textarea
                  className="result"
                  placeholder="Enter your question"
                  onChange={this.textareaChange}
                />
              )}
              <div className="generated">Generated</div>
              <div className="newWrapper">
                <div className="newQues newEl" />
                <div className="newAnswer newEl" />
              </div>
              <div className="variable_wrapper">
                <ul className="variables">
                  {this.state.variables.map((el, i) => (
                    <li key={el.name}>
                      <span className="var">{`${el.name} : ${el.value}`}</span>{" "}
                      <span className="range">
                        <InputRange
                          maxValue={1000}
                          width="500px"
                          minValue={0}
                          value={this.state.variableRange[i]}
                          onChange={this.onSliderChange(i)}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="btn" onClick={this.onsubmit}>
              SUBMIT
            </div>
          </div>
        </div>
        <div className="right">
          <div className="right_container">
            {" "}
            <input
              type="text"
              className="equation rightEl"
              placeholder="Enter the equation"
              onChange={this.onEquationChange}
            />
            <div className="btn rightEl" onClick={this.generateQues}>
              Generate
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Qgen;
