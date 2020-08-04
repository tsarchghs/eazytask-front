import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer ">
            <div className="container">
                <div className="footer__content">
                    <img className="footer__logo" src="/images/logo2.png" alt="" />
                    <div className="footer__social">
                        <div className="footer__icons">
                            <a target="_blank" href="https://www.facebook.com/eazytaskch/"><img style={{ width: '16px' }} src="/images/fb-icon.png" alt="" /></a>
                            <a target="_blank" href="https://www.instagram.com/eazytask.ch/"><img src="/images/insta-icon.png" alt="" /></a>
                            <a target="_blank" href="https://www.linkedin.com/company/eazytask/"><img src="/images/linkedin-icon.png" alt="" /></a>
                        </div>
                        <div className="footer__rights">
                            <h5 className="roboto">All rights reserved - eazytask 2020</h5>
                            <Link style={{ paddingRight: 130 }} to="/impressum" className="text-center">Impressum</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;