import React from "react";

const MainStep = props => {
    let info = props.reason
        ? { onClick: props.goToStep("THANK"), style: { color: "black" } }
        : { onClick: undefined, style: { color: "red" } }
    return (
        <React.Fragment>
            <h3>We are sorry to see you go</h3><br />
            <h5>Please tell us why you decided to delete your account.</h5>
            {
                props.items.map(item => (
                    <React.Fragment>
                        <input
                            type="radio"
                            value={props.reason == item.value}
                            name="reason"
                            onClick={props.onChange(item.value)}
                        />{item.value} <br />
                    </React.Fragment>
                ))
            }
            <div onClick={props.goToStep("OTHER")}>
                <input type="radio" name="reason" />Other
            </div>
            <button onClick={info.onClick} style={info.style}>Next</button>
        </React.Fragment>
    )
}

export default MainStep;