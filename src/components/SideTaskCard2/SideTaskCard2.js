import React from "react";
import { Link, withRouter } from "react-router-dom";

const SideTaskCard2 = props => {
    return (
        <Link to={"/task/" + props.task.id}>
            <div className="offers-image">
                <img src={props.task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__} />
                <div>
                    <h4 style={{ textAlign: "center" }}>{props.task.title}</h4>
                    <p>{new Date(props.task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
                </div>
            </div>
        </Link>
    )
}

export default withRouter(SideTaskCard2);