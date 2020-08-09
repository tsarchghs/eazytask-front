import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Footer = props => {
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
                            <h5 className="roboto">{props.translations.text_1[props.app_lang]}</h5>
                            <Link style={{ paddingRight: 130 }} to="/impressum" className="text-center npm">{props.translations.text_2[props.app_lang]}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}


let mapStateToProps = state => ({
    translations: state.app_lang.data["/footer"],
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})

export default connect(mapStateToProps)(Footer);