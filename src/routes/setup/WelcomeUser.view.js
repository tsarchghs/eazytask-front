import React from "react";
import { Link } from "react-router-dom";

export default props => {
    return (
        <React.Fragment>
            <div className="background-title mb30">
                <h1>Account Setup</h1>
                <p className="shadow__title">setup your account</p>
            </div>
            <img className="img__mobile" src="http://localhost:3000/images/Group.png" alt="" />
            <h3>Welcome {props.first_name}!</h3>
            <h5 className="flex-grow">Do you want to <br /> setup your account now?</h5>
        </React.Fragment>
    )
}