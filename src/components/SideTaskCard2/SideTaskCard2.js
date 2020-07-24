import React from "react";
import { Link, withRouter } from "react-router-dom";
// import { compose } from "recompose";
import withNotificationsInfo from "../HOC/withNotificationsInfo";

const SideTaskCard2 = props => {
    console.log("SideTaskCard2",props)
    return (
        <Link to={"/task/" + props.task.id}>
            <div className={`offers-image ${props.active && "active"}`}>
                <img src={props.task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__} />
                <div>
                    <h4 style={{ textAlign: "center" }}>{props.task.title}</h4>
                    <p>{new Date(props.task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
                </div>
            </div>
        </Link>
    )
}

const SideTaskCard2_ = withRouter(SideTaskCard2)

export default withNotificationsInfo(SideTaskCard2_);