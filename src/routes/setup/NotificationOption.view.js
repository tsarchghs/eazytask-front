import React from "react";
import PhoneInput from 'react-phone-number-input'

export default props => {
    return (
        <React.Fragment>
            <div className="background-title mb30">
                <h1>Notifications</h1>
                <p className="shadow__title">setup your account</p>
            </div>
            <h5 className="show__mobile"><img src="/images/sign.png" alt="" style={{ width: '20px', marginRight: '10px' }} />Last thing</h5>
            <div className="mobile__dots">
                <span className="dot active" />
                <span className="dot active" />
                <span className="dot active" />
            </div>
            <h5 className>How do you want <br /> to be notified?</h5>
            {/* <img class="img__mobile" src="/images/checklist.png" alt=""/> */}
            <div className="flex-grow radio-buttons">
                <label className="radio-container">
                    <img src="/images/message.png" style={{ marginBottom: '14px' }} alt="" />
                    <div>
                        <h5>Mail</h5>
                        <input type="radio" name="notification" />
                        <span className="checkmark" />
                    </div>
                </label>
                <label className="radio-container">
                    <img src="/images/chat.png" alt="" />
                    <div>
                        <h5>SMS</h5>
                        <input type="radio" name="notification" />
                        <span className="checkmark" />
                    </div>
                </label>
            </div>

        </React.Fragment>
    )
}