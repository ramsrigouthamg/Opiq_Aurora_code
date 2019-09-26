import React from "react";

import Row from "react-bootstrap/Row";
import { Element } from "react-scroll";

import volume from "./images/volume.png";
import type from "./images/types.png";
import speed from "./images/speed.png";

class Benefits extends React.Component {
  render() {
    return (
      <Element name="benefits" className="element">
        <Row style={{ paddingBottom: "3rem", backgroundColor: "#665df81c" }}>
          <div className="benefit-wrapper">
            <div className="center b-headline">
              <h1>Benefits </h1>
              <Row className="benefits">
                <div className="numbers color_21">
                  <img style={{ height: "5rem" }} src={volume} alt="" />
                  <p class="font_7">Volume</p>
                  <p class="font_7">
                    <div style={{ fontWeight: "normal" }}>
                      Generate thousands of questions
                    </div>
                  </p>
                </div>
                <div className="numbers color_26">
                  <img style={{ height: "5rem" }} src={speed} alt="" />
                  <p class="font_7">Speed</p>
                  <p class="font_7">
                    <div style={{ fontWeight: "normal" }}>
                      Questions created within seconds
                    </div>
                  </p>
                </div>
                <div className="numbers color_16">
                  <img style={{ height: "5rem" }} src={type} alt="" />
                  <p class="font_7">Question Types</p>
                  <p class="font_7">
                    <div style={{ fontWeight: "normal" }}>
                      Create multiple types of questions
                    </div>
                  </p>
                </div>
              </Row>
            </div>
          </div>
        </Row>
      </Element>
    );
  }
}

export default Benefits;
