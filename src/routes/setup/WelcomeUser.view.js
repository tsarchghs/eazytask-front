import React from "react";
import { Link } from "react-router-dom";

export default props => {
    return (
        <React.Fragment>
            <div className="background-title mb30">
                <h1>{props.getTrans(props.translations.text_1)}</h1>
                <p className="shadow__title">setup your account</p>
            </div>
            <img className="img__mobile" src="/images/Group.png" alt="" />
            <h3>{props.getTrans(props.translations.text_2)} {props.first_name}!</h3>
            <h5 className="flex-grow">{props.getTrans(props.translations.text_3)} <br /> {props.getTrans(props.translations.text_4)}</h5>
            </React.Fragment>
    )
}