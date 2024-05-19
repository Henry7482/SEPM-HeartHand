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

  const [activeLink, setActiveLink] = useState('/home');

  const handleClick = (path) => {
    setActiveLink(path);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <ul id="headbar">
        <li>
          <a href="#" style={{ textDecoration: "none" }}>FAQs </a>
          <a href="#" style={{ textDecoration: "none" }}>Contact Us </a>
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
            <>
              <li>
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
              </li>
            </>
          )}
          {!user && (
            <>
              <Link
                to="/DonorLogin"
                className="login btn btn-outline-dark py-1"
              >
                Login
              </Link>
            </>
          )}
          {/* <a>
            <img src={userLogo} alt="MyAccount" width="20" height="20" />{" "}
            {user && user.username ? user.username : "MyAccount"}
          </a> */}
        </li>
      </ul>

      <nav>
        <a href="/home" className="logo">
          <img src={logo} alt="logo" />
        </a>

        <div>
      <ul id="navbar" >
        <li onClick={() => handleClick('/home')}>
          <a className={activeLink === '/home' ? "active" : ""} href="/home">
            Latest news{" "}
          </a>
        </li>
        <li onClick={() => handleClick('/Organization')}>
          <a className={activeLink === '/Organization' ? "active" : ""} href="/Organization">
            Organization
          </a>
        </li>
        <li onClick={() => handleClick('/Donation')}>
          <a className={activeLink === '/Donation' ? "active" : ""} href="/Donation">
            Donation
          </a>
        </li>
        <li onClick={() => handleClick('/AboutUs')}>
          <a className={activeLink === '/AboutUs' ? "active" : ""} href="/AboutUs">
            About Us
          </a>
        </li>
      </ul>
      <div id="mobile" onClick={handleClick}>
        <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
    </div>
      </nav>
    </div>
  );
};

export default Navbar;
