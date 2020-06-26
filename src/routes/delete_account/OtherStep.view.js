import React from "react";

const OtherStep = props => {
    let info = props.reason
        ? { onClick: props.goToStep("THANK"), style: { color: "black" } }
        : { onClick: undefined, style: { color: "red" } }
    return (
        <React.Fragment>
            <h3>We are sorry to see you go</h3><br />
            <h5>Please tell us why you decided to delete your account.</h5>

            <textarea value={props.reason} onChange={e => props.onChange(e.target.value)()} type="text" />
            <button onClick={info.onClick} style={info.style}>Next</button>

        </React.Fragment>
    )
}

export default OtherStep;