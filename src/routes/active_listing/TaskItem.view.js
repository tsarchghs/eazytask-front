import React from "react";
import { Link } from "react-router-dom";

export default props => {
    console.log(props)
    return (
        <li>
            <Link to={"/task/" + props.item.id}>
                {props.item.title} - {props.item.description}
            </Link>
        </li>
    )
}