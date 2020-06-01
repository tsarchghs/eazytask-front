import React from "react";

export default props => {
    return (
        <React.Fragment>
            <div className="background-title mb30">
                <h1>Almost there</h1>
                <p className="shadow__title">setup your account</p>
            </div>
            <h5 className="show__mobile"><img src="/images/new/sign.png" alt="" style={{ width: '20px', marginRight: '10px' }} />One last thing</h5>
            <div className="mobile__dots">
                <span className="dot active" />
                <span className="dot active" />
                <span className="dot active" />
            </div>
            <h5 className="flex-grow">Do you want to <br /> join
          also as a tasker?</h5>
            <img className="img__mobile" src="/images/checklist.png" alt="" />
        </React.Fragment>
    )
}