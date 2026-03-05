import React from "react";
import "./Home.css";
import MainPhoto from "../assets/pexels-jibarofoto-1787220.jpg";

const Home = () => {
  return (
    <div className="hero" style={{ backgroundImage: `url(${MainPhoto})` }}>

      <div className="hero-content">

        <p className="small-text">LENSORIA</p>

        <h1 className="hero-title">
          VISUAL <br /> STORIES
        </h1>

        <p className="hero-subtitle">
          Every picture tells a beautiful story
        </p>

      </div>

    </div>
  );
};

export default Home;