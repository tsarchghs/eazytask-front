import React from "react";

export default props => {
    return (
        <React.Fragment>
            Profile picture <br />
            <input type="file" name="file" onChange={props.onChange} />
        </React.Fragment>
    )
}