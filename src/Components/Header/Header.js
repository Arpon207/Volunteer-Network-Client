import React from "react";
import "./Header.css";
import logo from "../../Images/logos/Group 1329.png";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header container">
      <div className="header-logo">
        <img src={logo} alt="" />
      </div>
      <nav>
        <NavLink
          className={({ isActive }) => isActive && "active-link"}
          to={"/"}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive && "active-link"}
          to={"/donation"}
        >
          Donation
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive && "active-link"}
          to={"/events"}
        >
          Events
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive && "active-link"}
          to={"/blog"}
        >
          blog
        </NavLink>
        <Link to={"/register"}>
          <button>Register</button>
        </Link>
        <Link to={"/signin"}>
          <button className="admin-btn">Admin</button>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
