import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../../Pages/Authentication/Signup/Signup";
import Home from "../../Pages/Home/Home/Home";
import Signin from "../../Pages/Authentication/Signin/Signin";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donation" element={"Donation"} />
        <Route path="/events" element={"Events"} />
        <Route path="/blog" element={"Blog"} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default Router;
