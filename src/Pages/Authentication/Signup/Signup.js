import React, { useEffect, useRef, useState } from "react";
import logo from "../../../Images/logos/Group 1329.png";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../../../Components/SocialLogin/SocialLogin";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { auth } from "../../../Firebase/firebase.init";

const Signup = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({
    name: "name should be 3-12 characters and shouldn't include any special character",
    email: "Please Provide a valid emaiil",
    password:
      "Password should contain minimun 8 characters, at least 1 character and 1 number",
    confirmPassword: "Passwords mismatched",
    firebaseError: "",
  });
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [createWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile] = useUpdateProfile(auth);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleFocus = (name) => {
    if (name === "name") {
      setFocused({ ...focused, name: true });
    }
    if (name === "email") {
      setFocused({ ...focused, email: true });
    }
    if (name === "password") {
      setFocused({ ...focused, password: true });
    }
    if (name === "confirmPassword") {
      setFocused({ ...focused, confirmPassword: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (name && email && password && confirmPassword) {
      await createWithEmailAndPassword(email, password);
      await updateProfile({ displayName: name });
    }
  };

  useEffect(() => {
    if (error?.code === "auth/email-already-in-use") {
      setErrorMessage({
        ...errorMessage,
        firebaseError: "this email is already used for another account.",
      });
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="signin">
      <div className="signin-container">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="signin-card">
          <div>
            <h2>Sign up With</h2>
            <SocialLogin />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                ref={nameRef}
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                pattern="^[A-Za-z0-9]{3,12}$"
                onBlur={() => handleFocus("name")}
                focus={focused.name.toString()}
                required
              />
              <p className="error-message">{errorMessage.name}</p>
            </div>
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
            <div className="input-wrapper">
              <input
                ref={confirmPasswordRef}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                pattern={passwordRef?.current?.value}
                onBlur={() => handleFocus("confirmPassword")}
                focus={focused.confirmPassword.toString()}
                required
              />
              <p className="error-message">{errorMessage.confirmPassword}</p>
            </div>
            {errorMessage.firebaseError && (
              <p className="firebase-error">{errorMessage.firebaseError}</p>
            )}
            <button type="submit">Sign up</button>
          </form>
          <p>
            Already have an account?{" "}
            <button onClick={() => navigate("/signin")}>
              Create an account.
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
