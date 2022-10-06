import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../Images/logos/Group 1329.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "./../../Firebase/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [active, setActive] = useState(false);

  const [userName, setUserName] = useState("");
  useEffect(() => {
    setTimeout(() => {
      if (user) {
        setUserName(user.displayName);
      }
    }, 1000);
  }, [user]);

  const handleActive = () => {
    if (window.scrollY >= 80) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  window.addEventListener("scroll", handleActive);

  return (
    <section className="header-container">
      <div className={active ? "brand top-100" : "brand top-0"}>
        <img src={logo} alt="" />
      </div>
      <div className="header container">
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
          <a href=" ">{userName}</a>
          {user ? (
            <button onClick={() => signOut(auth)}>Signout</button>
          ) : (
            <Link to={"/signup"}>
              <button>Register</button>
            </Link>
          )}
          <Link to={"/admin"}>
            <button className="admin-btn">Admin</button>
          </Link>
        </nav>
      </div>
    </section>
  );
};

export default Header;
