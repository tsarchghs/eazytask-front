import React from "react";
import { Textfit } from 'react-textfit';
import { Link } from "react-router-dom";
import getImageUrl from "../../utils/getImageUrl";
import { connect } from "react-redux";

const MainTaskCard = props => {
    let thumbnail;
    if (props.task.thumbnail) thumbnail = getImageUrl(props.task.thumbnail,"medium");
    else thumbnail = window.__THUMBNAIL_DEFAULT_PICTURE__

    let sub_category_name;
    for (let category of props.translations.categories) {
        sub_category_name = category.sub_categories.find(x => x.en == props.task.Category.name)
        if (sub_category_name) break;
    }
    if (sub_category_name) sub_category_name = sub_category_name[props.app_lang]
    else sub_category_name = props.task.Category.name;

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
                        <h5>{sub_category_name}</h5>
                        <h5>CHF {props.task.expected_price}.-</h5>
                    </div>
                </div>
            </Link>
        </div>
    )
}

const mapStateToProps = state => ({
    translations: state.app_lang.data["/create-task"],
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})

export default connect(mapStateToProps)(MainTaskCard);