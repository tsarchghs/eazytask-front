import React from "react";

export default props => {
    return (
        <React.Fragment>
            <div className="background-title mb30">
                <h1>{props.getTrans(props.translations.text_13)}</h1>
                <p className="shadow__title">setup your account</p>
            </div>
            <h5 className="show__mobile"><img src="/images/sign.png" alt="" style={{ width: '20px', marginRight: '10px' }} />
                {props.getTrans(props.translations.text_39)}
            </h5>
            <div className="mobile__dots">
                <span className="dot active" />
                <span className="dot active" />
                <span className="dot active" />
            </div>
            <h5 className="fs24 fwb">{props.getTrans(props.translations.text_14)} {props.getTrans(props.translations.text_15)}</h5>
            {/* <img class="img__mobile" src="/images/checklist.png" alt=""/> */}
            <div className="flex-grow radio-buttons">
                <label className={"radio-container " + (props.notification_option !== "EMAIL" ? "shadowed" : "")}>
                    <img src="/images/message.png" style={{ marginBottom: '14px' }} alt="" />
                    <div>
                        <h5 style={{marginBottom: 30}}>{props.getTrans(props.translations.text_16)}</h5>
                        <input 
                            checked={props.notification_option == "EMAIL"} 
                            type="radio" 
                            name="notification"
                            onChange={props.setEMAIL}
                        />
                        <span className="checkmark" />
                    </div>
                </label>
                <label className={"radio-container " + (props.notification_option !== "SMS" ? "shadowed" : "")}>
                    <img src="/images/chat.png" alt="" />
                    <div>
                        <h5 style={{marginBottom: 30}}>{props.getTrans(props.translations.text_17)}</h5>
                        <input 
                            checked={props.notification_option == "SMS"} 
                            type="radio" 
                            name="notification"
                            onChange={props.setSMS}
     
                        />
                        <span className="checkmark" />
                    </div>
                </label>
            </div>

        </React.Fragment>
    )
}