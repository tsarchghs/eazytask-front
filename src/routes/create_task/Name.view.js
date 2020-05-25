import React from "react";

export default props => {
    return (
        <React.Fragment>
            Create a task:<br />
            Name: <input value={props.name} onChange={props.onNameChange} />
        </React.Fragment>
    )
}