import React from 'react';
import { Link } from "react-router-dom";

export default props => {
    let button = <button {...props}>{props.value}</button>
    if (props.href) return <Link to={props.href}>{button}</Link>
    else return button
}