import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Element } from "react-scroll";

import ef from "./images/ef.png";
import sinova from "./images/sinova.png";

class Partners extends React.Component {
  render() {
    return (
      <Element name="partners" className="element">
        <Row style={{ paddingBottom: "5rem" }}>
          <Col>
            <div className="center c-headline">
              <h1>Partners </h1>
              <Row style={{ margin: "5rem" }}>
                <div className="partners">
                  <h3>Backed by</h3>
                  <h4>Entreprenuer First & SGInnovate</h4>
                  <a
                    href="http://joinef.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img style={{ height: "4rem" }} src={ef} alt="" />
                  </a>
                  <a
                    href="https://www.sginnovate.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      style={{ height: "5rem" }}
                      src={sinova}
                      alt="sginnovate"
                    />
                  </a>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </Element>
    );
  }
}

export default Partners;
