import React from "react";

export default props => {
    return (
        <React.Fragment>
            <div className="background-title mb5">
                <h1>{props.getTrans(props.translations.text_8)}</h1>
                <p className="shadow__title">setup your account</p>
            </div>
            <h5 className="show__mobile"><img src="/images/Vector.png" alt="" style={{ width: '20px', marginRight: '10px' }} />Location</h5>
            <div className="mobile__dots">
                <span className="dot active"></span>
                <span className="dot active"></span>
                <span className="dot" />
            </div>
            <h4 className="mb30">{props.getTrans(props.translations.text_9)}</h4>
            <div className="flex-grow input__group" style={{display:"block"}}>
                <div className="two__inputs">
                    <input value={props.zipCode} onChange={props.onZipCodeChange} type="text" className="input gray" 
                    placeholder={props.getTrans(props.translations.text_10)} />
                    <input value={props.city} onChange={props.onCityChange} type="text" className="input gray" 
                    placeholder={props.getTrans(props.translations.text_11)} />
                </div>
                <input value={props.address} onChange={props.onAddressChange} type="text" className="input gray" 
                placeholder={props.getTrans(props.translations.text_12)} />

            </div>
        </React.Fragment>
    )
}