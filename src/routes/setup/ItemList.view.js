import React from "react";

export default props => (
    <ul>
        {props.items.map(item => {
            return item + ",   "
        })} 
    </ul>
)