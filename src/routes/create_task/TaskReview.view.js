import React from "react";
import { Link } from "react-router-dom";

export default props => {
    console.log("TASK_REVIEW",props)
    let { day, month, year } = props;
    let due_date = new Date(`${month}/${day}/${year}`).toLocaleDateString().replace(/\//g,".")
    return (
        <React.Fragment>
            <div className="background-title ">
                <h1>{props.getTrans(props.translations.text_36)}</h1>
                <h3>{props.getTrans(props.translations.text_37)}</h3>
                <p className="shadow__title no-contain">create a task on eazytask easy </p>
            </div>
            <h4 className="show__mobile">
                {props.getTrans(props.translations.text_36)}  <br />
                <span>{props.getTrans(props.translations.text_37)}</span>
            </h4>
            <div className="task-section" style={{ width: "100%" }}>
                <p><span>{props.getTrans(props.translations.text_38)}</span> {props.name}</p>
                <p><span>{props.getTrans(props.translations.text_39)}</span>  {props.description}</p>
                <p><span>{props.getTrans(props.translations.text_36)}
                {
                    props.date_type 
                    ? props.getTrans(props.translations.text_40) 
                    : props.getTrans(props.translations.text_341)
                }</span> {due_date}</p>
                <p><span>{props.getTrans(props.translations.text_42)}</span> {props.address}, {props.zipCode} {props.city}</p>
                <p><span>{props.getTrans(props.translations.text_43)}</span> {props.categoryGroupName}</p>
                <p><span>{props.getTrans(props.translations.text_44)}</span> {props.category}</p>
            </div>
        </React.Fragment>

    )
    return (
        <React.Fragment>
            Task review <br/>
            title: { props.name} <br />
            description: { props.description} <br />
            date: { due_date } ({ props.date_type == "FIXED_DATE" ? "Fixed" : "Until"}) <br />
            location: { props.address }, { props.zipCode } { props.city } <br />
            category: { props.categoryGroupName} <br />
            sub category: { props.category } <br />
        </React.Fragment>
    )
}