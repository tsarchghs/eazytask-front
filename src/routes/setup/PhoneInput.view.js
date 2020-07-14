import React from "react";
import PhoneInput from 'react-phone-number-input'

export default props => {
    return (
        <React.Fragment>
            <div className="background-title mb5">
                <h1>Phone number</h1>
                <p className="shadow__title">Type your phone number</p>
            </div>
            <h5 className="show__mobile"><img src="/images/Vector.png" alt="" style={{ width: '20px', marginRight: '10px' }} />Location</h5>
            <div className="mobile__dots">
                <span className="dot active"></span>
                <span className="dot active"></span>
                <span className="dot" />
            </div>
            <h4 className="mb30">Type your phone number</h4>
            <div className="flex-grow input__group" style={{ display: "block" }}>
                <PhoneInput value={props.value} onChange={props.onChange} />
            </div>
        </React.Fragment>
    )
}