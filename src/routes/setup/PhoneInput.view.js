import React from "react";
import PhoneInput from 'react-phone-number-input'

const PhoneInputStep = props => {
    return (
        <PhoneInput value={props.value} onChange={props.onChange}/>
    )
}
export default PhoneInputStep;