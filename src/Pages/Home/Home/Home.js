import React, { useState } from "react";
import Volunteers from "../Volunteers/Volunteers";
import "./Home.css";
import Header from "./../../../Components/Header/Header";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <Header />
      <section className="home">
        <h1>I GROW BY HELPING PEOPLE IN NEED.</h1>
        <div className="search">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Searh..."
          />
          <button type="submit">Search</button>
        </div>
        <Volunteers searchText={searchText} />
      </section>
    </>
  );
};

export default Home;
