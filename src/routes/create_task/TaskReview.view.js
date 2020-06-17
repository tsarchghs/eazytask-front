import React from "react";

export default props => {
    console.log("TASK_REVIEW",props)
    let { day, month, year } = props;
    let due_date = new Date(`${month}/${day}/${year}`).toLocaleDateString().replace(/\//g,".")
    return (
        <React.Fragment>
            <div className="background-title ">
                <h1>Task</h1>
                <h3>review</h3>
                <p className="shadow__title no-contain">create a task on eazytask easy </p>
            </div>
            <h4 className="show__mobile">
                Task  <br />
                <span>review</span>
            </h4>
            <div className="task-section">
                <p><span>Title:</span> {props.name}</p>
                <p><span>Description:</span>  {props.description}</p>
                <p><span>Date ({props.date_type == "FIXED_DATE" ? "Fixed" : "Until"}):</span> {due_date}</p>
                <p><span>Location:</span> {props.address}, {props.zipCode} {props.city}</p>
                <p><span>Category:</span> {props.categoryGroupName}</p>
                <p><span>Sub:</span> {props.category}</p>
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