import React from "react";
import "../styles/header.css";

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <video autoPlay muted loop id="background-video">
          <source src="../images/Welcomecar.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p id="subheader">{props.data ? props.data.paragraph : "Loading"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};