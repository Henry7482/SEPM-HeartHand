import React, { useState } from "react";
import './login.css'

import user_icon from '../assets/usericon.png';
import password_icon from '../assets/password.png';

const login = () => {

    return(
        <div className="container">
            <div className="header">
                <div className="text">Log In</div>
                <div className="underline"></div>
            </div>
            <div className="input">
                <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder="Name" />
                </div>
                <div className="input">
                    <img src={password_icon}alt="" />
                    <input type="password" placeholder="Password" />
                </div>
            </div>
            <div className="forgot-password">Forgot Password? <span>Click Here!</span></div>
            <div className="submit-container">
                <div className="submit">Sign Up</div>
                <div className="submit">Login</div>
            </div>
        </div>
    )
}

export default login