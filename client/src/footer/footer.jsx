import React, { Component } from "react";
import './header.css';
import youtubeLogo from "../assets/youtube";
import facebookLogo from "../assets/facebook.png";
import instagramLogo from "../assets/instagram.png";
import twitterLogo from "../assets/twitter.png";

export default function Footer() {
    return (
    <footer className="footer">
        <div className="sb_footer-top">
            <div className="sb_footer section_padding">
                <div className="sb_footer-links">
                    <div className="sb_footer-links_div">
                        <h4>Contact Us</h4>
                        <a href="/location">
                            <p>702D,Nguyen Van Linh,Tan Hung,District 7,Ho Chi Minh City</p>
                        </a>
                        <a href="/phonenumber">
                            <p>0123-123-123</p>
                        </a>
                        <a href="/info">
                            <p>info@charityweb.org</p>
                        </a>
                    </div>
                    <div className="sb_footer-links_div">
                        <h4>Navigation</h4>
                        <a href="/Latest News">
                            <p>Latest news</p>
                        </a>
                        <a href="/Our Impact">
                            <p>Our impact</p>
                        </a>
                        <a href="/About Us">
                            <p>About Us</p>
                        </a>
                    </div>
                    <div className="sb_footer-links_div">
                        <h4>Organization</h4>
                    </div>
                    <div className="sb_footer-links_div">
                        <h4>Company</h4>
                        <a href="/about">
                            <p>About</p>
                        </a>
                        <a href="/press">
                            <p>Press</p>
                        </a>
                        <a href="/career">
                            <p>Career</p>
                        </a>
                        <a href="/contact">
                            <p>Contact</p>
                        </a>
                    </div>
                    <div className="sb_footer-links_div">
                        <h4>Follow Us </h4>
                        <div className="socialmedia">
                        <a><img src={youtubeLogo} alt="youtube" width="30" height="30" /></a>
                        <a><img src={facebookLogo} alt="facebook" width="30" height="30"/></a>
                        <a><img src={instagramLogo} alt="instagram" width="30" height="30"/></a>
                        <a><img src={twitterLogo} alt="twitter" width="30" height="30"/></a>
                        </div>
                    </div>
                </div>

        <hr></hr>

        <div className="sb_footer-below">
            <div className="sb_footer-copyright">
                <p>
                    @{new Date().getFullYear()} CodeInn.All right reserved. 
                </p>
            </div>
        </div>

            </div>
        </div>
    </footer>
    );
}
