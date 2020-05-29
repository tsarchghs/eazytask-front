import React from "react";

export default props => {
    return (
        <React.Fragment>
            Other category:<br />
            Name: <input value={props.category} onChange={props.onCategoryChange} />
        </React.Fragment>
    )
}