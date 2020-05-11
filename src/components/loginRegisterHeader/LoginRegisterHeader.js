import React from "react";
import { Link } from "react-router-dom";

export default props => {
    return (
        <React.Fragment>
            <Link to="/login">
            <button>Login</button>
            </Link>
            <Link to="/register">
            <button>register</button>
            </Link>
        </React.Fragment>
    )
}