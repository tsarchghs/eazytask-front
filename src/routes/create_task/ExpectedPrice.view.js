import React from "react";

export default props => {
    return (
        <React.Fragment>
            Expected price<br />
            <input type="number" value={props.expected_price} onChange={props.onExpectedPriceChange} />
        </React.Fragment>
    )
}