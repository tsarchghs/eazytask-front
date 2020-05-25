import React from "react";

export default props => {
    return (
        <React.Fragment>
            Create a task:<br />
            Description: <input value={props.description} onChange={props.onDescriptionChange} />
        </React.Fragment>
    )
}