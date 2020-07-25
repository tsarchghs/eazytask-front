import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import Success from "./Success";
import PhoneNumberForm from "./PhoneNumberForm";
import VerificationCode from "./VerificationCode";

import { isValidPhoneNumber } from 'react-phone-number-input'

import axios from "../../utils/axios";

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
    render(){
        let buttonType = this.state.valid ? "submit" : "button"
        let buttonStyle = this.state.valid ? { backgroundColor: undefined } : { backgroundColor: "darkgrey" }

        let { search } = this.props.location;
        let params = queryString.parse(search);
        if (params.success) return <Success />
        if (!params.phone_number) return <PhoneNumberForm
            value={this.state.phone_number}
            onChange={phone_number => this.setState({ 
                phone_number, 
                valid: isValidPhoneNumber(phone_number) 
            })}
            onSubmit={this.phoneNumberOnSubmit}
            buttonType={buttonType}
            buttonStyle={buttonStyle}
        />
        if (params.phone_number) return <VerificationCode
            phone_number={this.state.phone_number}
            buttonType={buttonType}
            buttonStyle={buttonStyle}
        />

    }
}

export default withRouter(ChangePhoneNumber);