import React from "react";
import { Link } from "react-router-dom";

export default props => {
    return (
        <React.Fragment>
            Welcome {props.first_name}<br/>
        </React.Fragment>
    )
}