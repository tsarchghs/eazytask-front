import React from "react";
import { Textfit } from 'react-textfit';
import { Link } from "react-router-dom";
import getImageUrl from "../../utils/getImageUrl";

const MainTaskCard = props => {
    let thumbnail;
    if (props.task.thumbnail) thumbnail = getImageUrl(props.task.thumbnail,"medium");
    else thumbnail = window.__THUMBNAIL_DEFAULT_PICTURE__
    
    return (
        <div className="listing-card" style={{ borderRadius: 21 }}>
            <Link to={"/task/" + props.task.id}>
                <div className="listing-card__img">
                    <div className="lc-img" style={{
                        backgroundImage: `url("${thumbnail}")`
                    }}
                    />
                    <div className="listing-card__img--mask" />
                </div>
                <div className="listing-card__info">
                    <Textfit max={60} mode="single">{props.task.title}</Textfit>
                    <h5>{props.task.User.first_name} {props.task.User.last_name[0]}.</h5>
                </div>
                <div className="listing-card__hover flex aic">
                    <div>
                        <h5>{props.task.city || "-"}</h5>
                        <h5>{props.task.due_date ? new Date(props.task.due_date).toLocaleDateString() : "-"}</h5>
                    </div>
                    <div style={{ marginRight: 0 }}>
                        <h5>{props.task.Category.name}</h5>
                        <h5>CHF {props.task.expected_price}.-</h5>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default MainTaskCard;