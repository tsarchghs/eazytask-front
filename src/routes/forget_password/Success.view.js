import React from "react";
import { Link } from "react-router-dom";

export default props => (
    <div>
        Success <br/>
        Password updated<br/>
        Now you can login with your new password <br/>

        <Link to="/login">Go to login</Link>        
    </div>
)