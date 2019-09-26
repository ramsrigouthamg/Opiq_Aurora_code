import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Element } from "react-scroll";

import karisma from "./images/karishma.jpg";
import ramsri from "./images/ramsri.jpg";

class Team extends React.Component {
  render() {
    return (
      <Element name="team" className="element">
        <Row
          style={{
            paddingBottom: "3rem"
          }}
        >
          <Col>
            <div className="center c-headline">
              <h1>Team </h1>
              <Row
                style={{
                  margin: "5rem",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <div class="team__member team-1">
                  <div
                    alt="Team Member"
                    style={{
                      backgroundImage: `url(${karisma})`,
                      borderRadius: "50%",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      margin: "auto",
                      height: "8rem",
                      width: "8rem",
                      marginBottom: "1.5rem"
                    }}
                  />
                  <h4>Karishma Galani</h4>
                  <h6>Co-Founder </h6>
                  <h>CEO </h>
                  <p>Edtech innovation in schools</p>
                  <a
                    href="https://www.linkedin.com/in/karishmagalani/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fa fa-linkedin" />
                  </a>
                </div>
                <div class="team__member team-2">
                  <img
                    src={ramsri}
                    alt="Team Member"
                    style={{ marginBottom: "1rem", borderRadius: "50%" }}
                  />
                  <h4>Ramsri Golla</h4>
                  <h6>Co-Founder</h6>
                  <h6>CTO</h6>
                  <p>Deep experience in AI and NLP</p>
                  <a
                    href="https://www.linkedin.com/in/ramsrig/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fa fa-linkedin" />
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

export default Team;
