import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import Success from "./Success";
import PhoneNumberForm from "./PhoneNumberForm";
import VerificationCode from "./VerificationCode";

import { isValidPhoneNumber } from 'react-phone-number-input'

import axios from "../../utils/axios";

import { compose } from "recompose";
import { connect } from "react-redux";

class ChangePhoneNumber extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            "phone_number": "+41"
        }
    }
    phoneNumberOnSubmit = e => {
        e.preventDefault();
        let { phone_number } = this.state;
        if (!isValidPhoneNumber(phone_number)) return;
        axios.post("/users/send_phone_verification_code", { phone_number })
            .catch(e => console.log(e))
        this.props.history.push("?phone_number=" + this.state.phone_number)
    }
    getTrans = obj => {
        let data = obj[this.props.app_lang];
        if (typeof (data) == "string") return data;
        if (data.length) {
            return data.map(str => <React.Fragment>
                {str}<br />
            </React.Fragment>)
        }
    }
    render(){
        let buttonType = this.state.valid ? "submit" : "button"
        let buttonStyle = this.state.valid ? { backgroundColor: undefined } : { backgroundColor: "darkgrey" }

        let { search } = this.props.location;
        let params = queryString.parse(search);
        let common = { 
            translations: this.props.translations, 
            app_lang: this.props.app_lang, 
            common: this.props.common,
            getTrans: this.getTrans
        }
        if (params.success) return <Success {...common} />
        if (!params.phone_number) return <PhoneNumberForm
            value={this.state.phone_number}
            onChange={phone_number => this.setState({ 
                phone_number, 
                valid: isValidPhoneNumber(phone_number) 
            })}
            onSubmit={this.phoneNumberOnSubmit}
            buttonType={buttonType}
            buttonStyle={buttonStyle}
            {...common}
        />
        if (params.phone_number) return <VerificationCode
            phone_number={this.state.phone_number}
            buttonType={buttonType}
            buttonStyle={buttonStyle}
            {...common}
        />

    }
}

const mapStateToProps = state => ({
    translations: state.app_lang.data["/change-phone-number"],
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})

export default compose(withRouter, connect(mapStateToProps))(ChangePhoneNumber)