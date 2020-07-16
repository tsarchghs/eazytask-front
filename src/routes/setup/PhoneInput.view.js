import React from "react";
import PhoneInput from 'react-phone-number-input'

export default props => {
    return (
        <React.Fragment>
            <div className="background-title mb5">
                <h1>{props.getTrans(props.translations.text_18)}</h1>
                <p className="shadow__title">{props.getTrans(props.translations.text_19)}</p>
            </div>
            <h5 className="show__mobile"><img src="/images/sign.png" alt="" style={{ width: '20px', marginRight: '10px' }} />
                {props.getTrans(props.translations.text_18)}
            </h5>
            <div className="mobile__dots">
                <span className="dot active"></span>
                <span className="dot active"></span>
                <span className="dot active" />
            </div>
            <h4 className="mb30">{props.getTrans(props.translations.text_19)}</h4>
            <div className="flex-grow input__group" style={{ display: "block" }}>
                <PhoneInput value={props.value} onChange={props.onChange} />
            </div>
        </React.Fragment>
    )
}