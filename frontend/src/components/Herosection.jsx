import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./Herosection.css";

function Herosection() {
  return (
    <div className="hero-container">
      <video src="/videos/video1.mp4" autoPlay loop muted />
      <h1>RENT FROM THE BEST</h1>
      <p>check out our site for renting quality clothes </p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline2"
          buttonSize="btn--large"
          destination="Prods"
        >
          EXPERIENCE CHICNESS
        </Button>
      </div>
    </div>
  );
}

export default Herosection;
