import React, {useState} from "react";
import './header.css';
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import logo from "../assets/Screenshot 2024-04-10 022637.png";

const Header=()=>{
    const [toggleMenu, setToggleMenu] = useState(false);

    return(
       <div className= "navbar-bg">
            <div className= "sb_navbar">
                 <div className="sb_navbar-links">
                    <div className="sb_navbar-links_logo">
                        <a href="www.google.com">
                            <img src={logo} alt="logo" />
                         </a>
                    </div>
                    <div className="sb_navbar-links_container">
                        <p>
                            <a href="www.google.com">
                            Latest news 
                            </a>
                        </p>
                        <p>
                            <a href="www.google.com">
                            Organization
                            </a>
                        </p>
                        <p>
                            <a href="www.google.com">
                            Our impact
                            </a>
                        </p>
                        <p>
                            <a href="www.google.com">
                            About Us
                            </a>
                        </p>
                    </div>
                </div>
                <div className="sb_navbar-button">
                <a href="www.google.com">
                    <button type ="button">DONATE</button>
                </a>    
                </div>
                <div className="sb_navbar-menu">
                    {toggleMenu ? (
                        <RiCloseLine
                        color="#000"
                        size={27}
                        onClick={()=> setToggleMenu(false)}
                        />) :(
                            <RiMenu3Line
                            color="#000"
                            size={27}
                            onClick={()=> setToggleMenu(true)}
                        />

                    )}

                    {toggleMenu && (
                        <div className="sb_navbar-menu_container scale-up-center">
                            <div className ="sb_navbar-menu_container-links">
                                <p>
                                    <a href="www.google.com">
                                        Latest news 
                                    </a>
                                </p>
                                <p>
                                    <a href="www.google.com">
                                    Organization
                                    </a>
                                </p>
                                <p>
                                    <a href="www.google.com">
                                    Our impact
                                    </a>
                                </p>
                                <p>
                                    <a href="www.google.com">
                                    About Us
                                    </a>
                                </p>
                            </div>

                            <div className="sb_navbar-menu_container-links-sign">
                                <a href="www.google.com">
                                     <button type ="button">DONATE</button>
                                </a>    
                            </div>
                            </div>
                    )}


                </div>
            </div>
        </div>
       
    )
}





export default Header;