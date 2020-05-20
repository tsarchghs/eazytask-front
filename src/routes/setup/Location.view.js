import React from "react";

export default props => {
    return (
        <React.Fragment>
            Location<br/>
            Zip: <input value={props.zipCode} onChange={props.onZipCodeChange} />
            Address: <input value={props.address} onChange={props.onAddressChange} />
            City: <input value={props.city} onChange={props.onCityChange} />
        </React.Fragment>
    )
}