import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default props => {
    let commonClassNames = "pick_date_button"; // class-names that will be to both buttons
    let selectedClassNames = "active"; // class-names that will be added only to the selected button
    let fixedClassNames = commonClassNames
    let untilClassNames = commonClassNames
    console.log({ fixedClassNames, untilClassNames})
    if (props.date_type === "FIXED_DATE") 
        fixedClassNames += " " + selectedClassNames
    else untilClassNames += " " + selectedClassNames
    return (
        <React.Fragment>
            
            <div className="background-title ">
                <h1>{props.getTrans(props.translations.text_7)}</h1>
                <h3>{props.getTrans(props.translations.text_7_1)}</h3>
                <p className="shadow__title no-contain">create a task on eazytask easy </p>
            </div>
            <h4 className="show__mobile">
                {props.getTrans(props.translations.text_7)}<br />
                <span>{props.getTrans(props.translations.text_7_1)}</span>
            </h4>

            <div className="date-section flex-grow" style={{ minHeight: 132 }}>
                <div className="date-section__tabs flex jcc aic">
                    <h3 style={{ cursor: "pointer" }} className={fixedClassNames} onClick={props.fixedOnClick}>{props.getTrans(props.translations.text_8)}</h3>
                    <h3 style={{ cursor: "pointer" }} className={untilClassNames} onClick={props.untilOnClick}>{props.getTrans(props.translations.text_9)}</h3>
                </div>
                <div className="date-section__select flex jcc aic ">
                    <DatePicker
                        selected={props.due_date}
                        onChange={props.handleDateChange}
                    />
                </div>
                <div className="register__form">
                {props.errors.map(x => (
                        <div class="register__form--error">{x}</div>
                    ))}
                </div>
            </div>
            {/* <div className="flex-grow img-wrapper flex aic jcc">
                <img className="img__mobile " src="/images/calendar.png" alt="" />
            </div> */}
        </React.Fragment>
    )
}