import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <section className="home">
      <h1>I GROW BY HELPING PEOPLE IN NEED.</h1>
      <div className="search">
        <input type="text" placeholder="Searh..." />
        <button type="submit">Search</button>
      </div>
    </section>
  );
};

export default Home;
