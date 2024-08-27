import React from "react";
import "../styles/header.css";

export const Header = (props) => {
  return (
    <div className="vid">
       <video autoPlay loop muted playsInline>
       <source src="./car.mp4.mp4" type="video/mp4"></source></video>
    </div>
  );
};