import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Element } from "react-scroll";

import poly from "./images/polygon.png";

class About extends React.Component {
  render() {
    return (
      <Element name="about" className="element">
        <Row
          style={{
            paddingBottom: "3rem"
          }}
          id="about"
        >
          <Col>
            <div className="center c-headline">
              <h2>About </h2>
            </div>
            <div className="wrapperit">
              <div style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
                Generate quality assesments 100x faster
              </div>
              <div className="blooms">
                Questions based on Blooms Taxonomy<sup>*</sup>
              </div>
              <img src={poly} className="about-pyramid" alt="demo" />
            </div>
            <div className="citation">
              <sup>*</sup>Bloom’s Taxonomy was created in 1956 by Benjamin
              Bloom; it is widely used for teaching, learning, and assessments
              globally today
            </div>
          </Col>
        </Row>
      </Element>
    );
  }
}

export default About;
