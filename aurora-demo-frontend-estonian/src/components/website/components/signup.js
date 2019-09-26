import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Element } from "react-scroll";

class Signup extends React.Component {
  render() {
    return (
      <Element name="signup" className="element">
        <Row
          style={{
            paddingBottom: "3rem",
            backgroundColor: "#665df81c"
          }}
        >
          <Col>
            <div className="center c-headline">
              <h1>Interested? </h1>
              <form
                action="https://gmail.us20.list-manage.com/subscribe/post?u=27a969b3c6c196f9985b98f79&amp;id=95453d4e7f"
                method="post"
                id="subscribe"
                name="mc-embedded-subscribe-form"
                class="validate"
                target="_blank"
                novalidate
              >
                <div id="mc_embed_signup_scroll">
                  <input
                    type="email"
                    name="EMAIL"
                    className="email-input"
                    id="mce-EMAIL"
                    placeholder="Enter your email"
                    required
                  />
                  <span>
                    <input
                      style={{ backgroundColor: "#6c63ff", color: "white" }}
                      type="submit"
                      value="Subscribe"
                      name="subscribe"
                      id="mc-embedded-subscribe"
                      class="button"
                    />
                  </span>
                </div>
              </form>
              <div className="address">
                <p style={{ marginBottom: "0" }}> SGInnovate </p>
                <p style={{ marginBottom: "0" }}>32 Carpenter Street</p>
                <p>Singapore</p>
                Tel: +65-87800214
              </div>
            </div>
          </Col>
        </Row>
      </Element>
    );
  }
}

export default Signup;
