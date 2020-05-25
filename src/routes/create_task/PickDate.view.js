import React from "react";

export default props => {
    let commonClassNames = "pick_date_button"; // class-names that will be to both buttons
    let selectedClassNames = "custom___selected"; // class-names that will be added only to the selected button
    let fixedClassNames = commonClassNames
    let untilClassNames = commonClassNames
    console.log({ fixedClassNames, untilClassNames})
    if (props.date_type === "FIXED_DATE") 
        fixedClassNames += " " + selectedClassNames
    else untilClassNames += " " + selectedClassNames
    return (
        <React.Fragment>
            Pick a date:<br />
            <button className={fixedClassNames} onClick={props.fixedOnClick}>Fixed</button><br/>
            <button className={untilClassNames} onClick={props.untilOnClick}>Until</button> <br/>
            Day: <input 
                type="number" 
                placeholder="day" 
                value={props.day} 
                onChange={props.onDayChange}     
            />
            Month: <input 
                type="number" 
                placeholder="month" 
                value={props.month} 
                onChange={props.onMonthChange}
            />
            Year: <input 
                type="number" 
                value={props.year}
                onChange={props.onYearChange}     
            />
        </React.Fragment>
    )
}