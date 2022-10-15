import React from "react";
import "./Header.css";
import logo from "../../Images/logos/Group 1329.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "./../../Firebase/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  return (
    <div className="header Container">
      <div className="header-logo">
        <img src={logo} alt="" onClick={() => navigate("/")} />
      </div>
      <nav>
        <NavLink
          className={({ isActive }) => isActive && "active-link"}
          to={"/"}
          end
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
        {user ? (
          <Link onClick={() => signOut(auth)}>signout</Link>
        ) : (
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to={"/signin"}
          >
            signin
          </NavLink>
        )}

        <Link to={"/register"}>
          <button>Register</button>
        </Link>
        <Link to={"/admin"}>
          <button className="admin-btn">Admin</button>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
