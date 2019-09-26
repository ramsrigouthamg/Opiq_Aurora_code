import React from "react";
import { scroller } from "react-scroll";
import { Link } from "react-router-dom";

import bulb from "./images/lightbulb.png";

class Header extends React.Component {
  scrollTo(name) {
    scroller.scrollTo(name, {
      duration: 800,
      offset: -50,
      delay: 0,
      smooth: "easeInOutQuart"
    });
  }
  render() {
    return (
      <div class="headert normal" id="myHeader">
        <div className="logo-h">
          <img src={bulb} alt="logo" />
          <span>Aurora: AI-Assisted Assessments</span>
        </div>
        <div className="nav-items">
          <span>
            <a onClick={() => this.scrollTo("top")}>Home</a>
          </span>
          <span>
            <a onClick={() => this.scrollTo("about")}>About</a>
          </span>
          <span>
            <a onClick={() => this.scrollTo("team")}>Team</a>
          </span>
          <span>
            <a onClick={() => this.scrollTo("partners")}>Partners</a>
          </span>
          <span>
            <a onClick={() => this.scrollTo("signup")}>Contact</a>
          </span>
          <Link to="/demo2">
            <span className="try black" id="black">
              Try Aurora
            </span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
