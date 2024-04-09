import React from "react";
import './footer.css';


const Footer=()=>{
    return (
        <div className="footer">
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
                            <p><img src="http://surl.li/skdxi" alt="youtube"/></p>
                            <p><img src="https://t.ly/_V-5f" alt="facebook"/></p>
                            <p><img src="http://surl.li/sjpdg" alt="instagram"/></p>
                            <p><img src="https://t.ly/VGhpi" alt="twitter"/></p>
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
    )
}

export default Footer
