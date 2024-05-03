import React, { Component, useState } from "react";
import "./header.css";
import logo from "../assets/logo.png";
import youtubeLogo from "../assets/youtube.png";
import facebookLogo from "../assets/facebook.png";
import instagramLogo from "../assets/instagram.png";
import twitterLogo from "../assets/twitter.png";
import userLogo from "../assets/usericon.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <ul id="headbar">
        <li>
          <a href="www.google.com">FAQs </a>
          <a href="www.google.com">Contact Us </a>
        </li>

        <li>
          <a>
            <img src={youtubeLogo} alt="youtube" width="30" height="30" />
          </a>
          <a>
            <img src={facebookLogo} alt="facebook" width="30" height="30" />
          </a>
          <a>
            <img src={instagramLogo} alt="instagram" width="30" height="30" />
          </a>
          <a>
            <img src={twitterLogo} alt="twitter" width="30" height="30" />
          </a>
        </li>

        <li>
          {user && (
            <div>
              <a className="text-center btn-md">
                <img src={userLogo} alt="MyAccount" width="20" height="20" />{" "}
                {user.username}
              </a>
              <button
                onClick={handleLogout}
                className="login btn btn-outline-dark py-1"
              >
                Logout
              </button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/loginTest" className="login btn btn-outline-dark py-1">
                Login
              </Link>
            </div>
          )}
          {/* <a>
            <img src={userLogo} alt="MyAccount" width="20" height="20" />{" "}
            {user && user.username ? user.username : "MyAccount"}
          </a> */}
        </li>
      </ul>

      <nav>
        <a href="www.google.com" className="logo">
          <img src={logo} alt="logo" />
        </a>

        <div>
          <ul id="navbar" className={clicked ? "active" : ""}>
            <li>
              <a className="active" href="www.google.com">
                Latest news{" "}
              </a>
            </li>
            <li>
              <a href="www.google.com">Organization </a>
            </li>
            <li>
              <a href="www.google.com">Our impact </a>
            </li>
            <li>
              <a href="www.google.com"> About Us </a>
            </li>
          </ul>
        </div>
        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
