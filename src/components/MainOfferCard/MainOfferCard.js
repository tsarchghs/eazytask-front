import React from "react";

const MainOfferCard = props => {
    return (
        <div className="home__card" style={{ backgroundImage: `url("${props.task.thumbnail || window.__THUMBNAIL_DEFAULT_PICTURE__}")` }}>
            <div className="home__card--mask" />
            <h5 style={{ textAlign: "center" }}>{props.beforeTitleText} “{props.task.title}”</h5>
            <p>{new Date(props.task.due_date).toLocaleDateString().replace(/\//g, ".")}</p>
        </div>

    )
}

export default MainOfferCard;