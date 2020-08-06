import React from "react";
import { withRouter } from "react-router-dom";

const MainOfferCard = props => {
    console.log("MainOfferCard",props)
    return (
        <div style={{ cursor: "pointer"}} onClick={() => props.history.push(`/task/${props.task.id}/edit/offers/${props.offer.id}`)} className="home__card" style={{ backgroundImage: `url("${props.task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__}")` }}>
            <div className="home__card--mask" />
            <h5 style={{ textAlign: "center" }}>{props.beforeTitleText} “{props.task.title}”</h5>
            <p>{new Date(props.task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
        </div>

    )
}

export default withRouter(MainOfferCard);