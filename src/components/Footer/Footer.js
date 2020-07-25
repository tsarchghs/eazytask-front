import React from "react";

const Footer = () => {
    return (
        <footer className="footer ">
            <div className="container">
                <div className="footer__content">
                    <img className="footer__logo" src="/images/logo2.png" alt="" />
                    <div className="footer__social">
                        <div className="footer__icons">
                            <a target="_blank" href="#"><img style={{ width: '16px' }} src="/images/fb-icon.png" alt="" /></a>
                            <a target="_blank" href="#"><img src="/images/insta-icon.png" alt="" /></a>
                            <a target="_blank" href="#"><img src="/images/linkedin-icon.png" alt="" /></a>
                        </div>
                        <div className="footer__rights">
                            <h5 className="roboto">All rights reserved - eazytask 2020</h5>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;