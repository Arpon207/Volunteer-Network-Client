import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../../Pages/Authentication/Signup/Signup";
import Home from "../../Pages/Home/Home/Home";
import Signin from "../../Pages/Authentication/Signin/Signin";
import Events from "../../Pages/Events/Events";
import Admin from "../../Pages/Admin/Admin";
import Register from "./../../Pages/Register/Register";
import RequireAuth from "../../Pages/Authentication/RequireAuth/RequireAuth";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donation" element={"Donation"} />
        <Route path="/events" element={<Events />} />
        <Route path="/blog" element={"Blog"} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/register"
          element={
            <RequireAuth>
              <Register />
            </RequireAuth>
          }
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default Router;
