import React from "react";

export default props => {
    return (
        <React.Fragment>
            <div className="background-title mb30">
                <h1>{props.getTrans(props.translations.text_23)}</h1>
                <p className="shadow__title">setup your account</p>
            </div>
            <h5 className="show__mobile"><img src="/images/sign.png" alt="" style={{ width: '20px', marginRight: '10px' }} />{props.getTrans(props.translations.text_46)}</h5>
            <div className="mobile__dots">
                <span className="dot active" />
                <span className="dot active" />
                <span className="dot active" />
            </div>
            <h5 className="fs40 fwb">{props.getTrans(props.translations.text_24)} <br/>
                {props.getTrans(props.translations.text_25)}
            </h5>
            <p className="special flex-grow fs18">
            {props.translations.text_48[props.app_lang].map(
                i => <React.Fragment>{i} <br/></React.Fragment>
            )}            </p>
            <img className="img__mobile" src="/images/checklist.png" alt="" />
        </React.Fragment>
    )
}