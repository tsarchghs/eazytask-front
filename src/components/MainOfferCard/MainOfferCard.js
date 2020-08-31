import React from "react";
import { withRouter } from "react-router-dom";
import getImageUrl from "../../utils/getImageUrl";

const MainOfferCard = props => {
    let thumbnail;
    if (props.task.thumbnail) thumbnail = getImageUrl(props.task.thumbnail, "small");
    else thumbnail = window.__THUMBNAIL_DEFAULT_PICTURE__
    return (
        <div 
            style={{ cursor: "pointer"}} 
            onClick={() => props.history.push(`/task/${props.task.id}/edit/offers/${props.offer.id}`)} 
            className="home__card" 
            style={{ backgroundImage: `url("${thumbnail}")` }}
        >
            <div className="home__card--mask" />
            <h5 style={{ textAlign: "center" }}>“{props.task.title}” {props.beforeTitleText}</h5>
            <p>{new Date(props.task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
        </div>

    )
}

export default withRouter(MainOfferCard);