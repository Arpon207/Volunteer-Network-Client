import React from "react";
import "./SocialLogin.css";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { AiOutlineGoogle } from "react-icons/ai";

const SocialLogin = () => {
  return (
    <div className="social-login">
      <button className="google social-login-btn">
        <AiOutlineGoogle />
      </button>
      <button className="facebook social-login-btn">
        <FaFacebookF />
      </button>
      <button className="twitter social-login-btn">
        <FaTwitter />
      </button>
    </div>
  );
};

export default SocialLogin;
