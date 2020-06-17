import React from "react";

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
                <h1>Pick</h1>
                <h3>a date</h3>
                <p className="shadow__title no-contain">create a task on eazytask easy </p>
            </div>
            <h4 className="show__mobile">
                Pick a <br />
                <span>date</span>
            </h4>

            <div className="date-section">
                <div className="date-section__tabs flex jcc aic">
                    <h3 className={fixedClassNames} onClick={props.fixedOnClick}>Fixed</h3>
                    <h3 className={untilClassNames} onClick={props.untilOnClick}>Until</h3>
                </div>
                <div className="date-section__select flex jcc aic ">
                     <input
                        type="number"
                        placeholder="day"
                        value={props.day}
                        onChange={props.onDayChange}
                    />
             <input
                        type="number"
                        placeholder="month"
                        value={props.month}
                        onChange={props.onMonthChange}
                    />
                <input
                        type="number"
                        value={props.year}
                        onChange={props.onYearChange}
                    />
                </div>
            </div>
            <div className="flex-grow img-wrapper flex aic jcc">
                <img className="img__mobile " src="/images/calendar.png" alt="" />
            </div>

        </React.Fragment>
    )
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