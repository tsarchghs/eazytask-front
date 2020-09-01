import React from "react";
import { Link, withRouter } from "react-router-dom";
import withNotificationsInfo from "../HOC/withNotificationsInfo";
import getImageUrl from "../../utils/getImageUrl";
import { compose } from "recompose";
import { connect } from "react-redux";

const SideTaskCard = props => {
    let thumbnail;
    if (props.task.thumbnail) thumbnail = getImageUrl(props.task.thumbnail, "small");
    else thumbnail = window.__THUMBNAIL_DEFAULT_PICTURE__

    let sub_category_name;
    for (let category of props.translations.categories) {
        sub_category_name = category.sub_categories.find(x => x.en == props.task.Category.name)
        if (sub_category_name) break;
    }
    if (sub_category_name) sub_category_name = sub_category_name[props.app_lang]
    else sub_category_name = props.task.Category.name;


    let onClick = props.useWithRouter ? () => props.history.push(`/task/` + props.task.id) : undefined;
    let child = (
        <div 
            onClick={onClick} 
            className="home__card home__card--discover" 
            style={{ 
                backgroundImage: `url("${thumbnail}")`,
                cursor: "pointer" 
        }}>
            <div className={`home__card--mask ${props.active && "active"}`} />
            {/* <h5 style={{ textAlign: "center" }}>{props.beforeTitleText} “{props.task.title}”</h5> */}
            <div className="home__card--divide">
                <h5 style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    width: 160,
                    whiteSpace: "nowrap"
                }}>{props.task.title} <br /><p>{props.task.User.first_name} {props.task.User.last_name[0]}.</p></h5>
                <div>
                    <h6>{props.task.due_date ? new Date(props.task.due_date).toLocaleDateString() : "-"}</h6>
                    <h6>{props.task.zipCode} {props.task.city || "-"}</h6>
                    <h6>CHF {props.task.expected_price}.-</h6>
                    <h6 style={{ marginBottom: 0 }}>{sub_category_name}</h6>
                </div>
            </div>
        </div>
    )
    if (props.useWithRouter) return child;
    else return (
        <Link to={`/task/` + props.task.id}>
            {child}
        </Link>
    )
}

const mapStateToProps = state => ({
    translations: state.app_lang.data["/create-task"],
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})

const SideTaskCard_ = compose(connect(mapStateToProps),withRouter)(SideTaskCard)

export default withNotificationsInfo(SideTaskCard_);