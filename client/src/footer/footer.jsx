import React, { Component } from "react";
import "./footer.css";
import youtubeLogo from "../assets/youtube.png";
import facebookLogo from "../assets/facebook.png";
import instagramLogo from "../assets/instagram.png";
import twitterLogo from "../assets/twitter.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="sb_footer-top">
        <div className="sb_footer section_padding">
          <div className="sb_footer-links" style={{ textDecoration: "none" }}>
            <div className="sb_footer-links_div">
              <h4>Contact Us</h4>
              <p>702D,Nguyen Van Linh,Tan Hung,District 7,Ho Chi Minh City</p>
              <p>0123-123-123</p>
              <p>info@hearthand.org</p>
            </div>
            <div className="sb_footer-links_div">
              <h4>Navigation</h4>
              <a href="/home" style={{ textDecoration: "none" }}>
                <p>Latest news</p>
              </a>
              <a href="/Our Impact" style={{ textDecoration: "none" }}>
                <p>Our impact</p>
              </a>
              <a href="/AboutUs" style={{ textDecoration: "none" }}>
                <p>About Us</p>
              </a>
            </div>
            <div className="sb_footer-links_div">
              <h4>Organization</h4>
              <a href="/Organization" style={{ textDecoration: "none" }}>
                <p>Corporations</p>
              </a>
            </div>
            <div className="sb_footer-links_div">
              <h4>Company</h4>
              <a href="/AboutUs" style={{ textDecoration: "none" }}>
                <p>About</p>
              </a>
              <a href="/contact" style={{ textDecoration: "none" }}>
                <p>Contact</p>
              </a>
            </div>
            <div className="sb_footer-links_div">
              <h4>Follow Us </h4>
              <div className="socialmedia">
                <a style={{ textDecoration: "none" }}>
                  <img src={youtubeLogo} alt="youtube" width="30" height="30" />
                </a>
                <a style={{ textDecoration: "none" }}>
                  <img
                    src={facebookLogo}
                    alt="facebook"
                    width="30"
                    height="30"
                  />
                </a>
                <a style={{ textDecoration: "none" }}>
                  <img
                    src={instagramLogo}
                    alt="instagram"
                    width="30"
                    height="30"
                  />
                </a>
                <a style={{ textDecoration: "none" }}>
                  <img src={twitterLogo} alt="twitter" width="30" height="30" />
                </a>
              </div>
            </div>
          </div>

          <hr></hr>

          <div className="sb_footer-below">
            <div className="sb_footer-copyright">
              <p>@{new Date().getFullYear()} CodeInn.All right reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
