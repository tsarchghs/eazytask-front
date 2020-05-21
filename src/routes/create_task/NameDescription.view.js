import React from "react";

export default props => {
    return (
        <React.Fragment>
            Create a task:<br />
            Name: <input value={props.name} onChange={props.onNameChange} />
            Description: <input value={props.description} onChange={props.onDescriptionChange} />
        </React.Fragment>
    )
}