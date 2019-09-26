import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Home from "./components/Home";
import Qgen from "./components/Qjen";
import Demo2 from "./components/demo2/Demo2";
import Result from "./components/demo2/Result";
import SavedQuestions from "./components/demo2/SavedQuestions";
import Main from "./components/website/components/Main";

import "./styles/App.scss";

export default class App extends Component {
  render() {
    return (
      <Router>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/" component={Main} />
        <Route path="/qgen" component={Qgen} />
        <Route path="/demo2" component={Demo2} />
        <Route path="/result" component={Result} />
        <Route path="/savedquestions" component={SavedQuestions} />
      </Router>
    );
  }
}
