import React, { Component } from "react";
import './header.css';
import logo from "../assets/logo.png";
import youtubeLogo from "../assets/youtube.png";
import facebookLogo from "../assets/facebook.png";
import instagramLogo from "../assets/instagram.png";
import twitterLogo from "../assets/twitter.png";
import userLogo from "../assets/user.png";

class Navbar extends Component {
    state = { clicked: false };

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    };

    render() {
        return (
            <div>
                <ul id="headbar">
                    <li>
                        <a href="www.google.com">FAQs </a>
                        <a href="www.google.com">Contac Us </a>
                    </li>

                    <li>
                        <a><img src={youtubeLogo} alt="youtube" width="30" height="30" /></a>
                        <a><img src={facebookLogo} alt="facebook" width="30" height="30"/></a>
                        <a><img src={instagramLogo} alt="instagram" width="30" height="30"/></a>
                        <a><img src={twitterLogo} alt="twitter" width="30" height="30"/></a>
                    
                    </li>

                    <li>
                        <a><img src={userLogo} alt="MyAccount" width="20" height="20"/> MyAccount</a>
                    </li>
                </ul>

                <nav>
                    <a href="www.google.com" className="logo">
                        <img src={logo} alt="logo" />
                    </a>
    
                    <div>
                        <ul id="navbar" className={this.state.clicked ? "active" : ""}>
                            <li><a className="active" href="www.google.com">Latest news </a></li>
                            <li><a href="www.google.com">Organization </a></li>
                            <li><a href="www.google.com">Our impact </a></li>
                            <li><a href="www.google.com"> About Us </a></li>
                        </ul>
                    </div>
                    <div id="mobile" onClick={this.handleClick}>
                        <i id="bar" className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;
