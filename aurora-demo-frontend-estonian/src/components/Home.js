import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home_container">
      <div className="left">
        <div className="wrapper">
          <div className="content">
            <div className="title">AI - Assisted Assessments</div>
            <div className="subtitle">
              Generates questions based on content,
            </div>
            <div className="subtitle">
              generate assessments <span className="blue">1000x</span> faster
            </div>
          </div>
          <div className="links">
            <Link to="/qgen">
              <div className="qgen_link">QGEN</div>
            </Link>
            <Link to="/demo2">
              <div className="demo2_link">DEMO2</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="wrapper" />
      </div>
    </div>
  );
}
