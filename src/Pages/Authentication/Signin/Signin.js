import React, { useEffect, useRef, useState } from "react";
import "./Signin.css";
import logo from "../../../Images/logos/Group 1329.png";
import SocialLogin from "../../../Components/SocialLogin/SocialLogin";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../Firebase/firebase.init";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const Signin = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({
    email: "Please Provide a valid emaiil",
    password:
      "Password should contain minimun 8 characters, at least 1 character and 1 number",
    firebaseError: "",
  });
  const [focused, setFocused] = useState({
    email: false,
    password: false,
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleFocus = (name) => {
    if (name === "email") {
      setFocused({ ...focused, email: true });
    }
    if (name === "password") {
      setFocused({ ...focused, password: true });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email && password) {
      signInWithEmailAndPassword(email, password);
    }
  };

  useEffect(() => {
    if (error?.code === "auth/user-not-found") {
      setErrorMessage({ ...errorMessage, firebaseError: "User not found" });
    }
  }, [error]);

  return (
    <div className="signin">
      <div className="signin-container">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="signin-card">
          <div>
            <h2>Signin With</h2>
            <SocialLogin />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                ref={emailRef}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                pattern="[a-z0-9]+@gmail.com"
                onBlur={() => handleFocus("email")}
                focus={focused.email.toString()}
                required
              />
              <p className="error-message">{errorMessage.email}</p>
            </div>
            <div className="input-wrapper">
              <input
                ref={passwordRef}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                onBlur={() => handleFocus("password")}
                focus={focused.password.toString()}
                required
              />
              <p className="error-message">{errorMessage.password}</p>
            </div>
            {errorMessage.firebaseError && (
              <p className="firebase-error">{errorMessage.firebaseError}</p>
            )}
            <button type="submit">Sign In</button>
          </form>
          <p>
            Don't have an account?{" "}
            <button onClick={() => navigate("/signup")}>
              Create an account.
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
