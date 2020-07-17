import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
 
const getTrans = (app_lang,obj) => {
    let data = obj[app_lang];
    if (typeof(data) == "string") return data;
    if (data.length) {
        return data.map(str => <React.Fragment>
            {str}<br/>
        </React.Fragment>)
    }
}

class DeleteAccountThank extends React.Component {
    componentDidMount(){
        localStorage.setItem("eazytask:token", null);
        window.location.href = "/"
    }
    render(){
        return (
            <div className="container">
                <div className="content setup-ready">
                    <header>
                        <span className="show__mobile"><img src="/images/arrow.jpg" alt="" /></span>
                        <a href="#"><img className="logo__img" src="/images/logo.svg" alt="" /></a>
                    </header>
                    <section className="two-column__layout setup__mobile profile__cover">
                        <div className="two-column__info flex flex-column">
                            <div className="background-title mb5">
                                <h1>{getTrans(this.props.app_lang,this.props.translations.text_1)}</h1>
                            </div>
                            <h4 className="show__mobile">{getTrans(this.props.app_lang,this.props.translations.text_3)}</h4>
                            <p className="mb30 special">{getTrans(this.props.app_lang,this.props.translations.text_4)}</p>
                            <div className="flex-grow">
                                <img src="/images/computer_display_monochromatic.png" style={{ minWidth: '190px', width: '20%', margin: '0 auto' }} alt="" />
                            </div>
                            <div className="buttons__group">
                                {/* <button class="button__style no-color">Skip <span class="show__mobile">for now</span></button> */}
                                <Link to="/">
                                    <button className="button__style">
                                    {getTrans(this.props.app_lang,this.props.translations.text_5)}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    translations: state.app_lang.data["/delete_account_thank"],
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})

export default connect(mapStateToProps)(DeleteAccountThank);