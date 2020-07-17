import React from "react";

export default props => {
    console.log(props.expected_price,"props.expected_price")
    return (
        <React.Fragment>
            <div className="background-title">
                <h1>{props.getTrans(props.translations.text_18)}</h1>
                <h3>{props.getTrans(props.translations.text_18_1)}</h3>
                <p className="shadow__title no-contain">create a task on eazytask easy </p>
            </div>
            <h4 className="show__mobile">
                {props.getTrans(props.translations.text_18)} <br />
                <span>{props.getTrans(props.translations.text_18_1)}</span>
            </h4>
            <div className="price-section flex-grow">
                <div className="input-price flex aic jcc">
                    <input 
                        type="number"
                        onKeyDown={props.handleInputKeyDown}  
                        value={props.expected_price}
                        onChange={e => { props.onExpectedPriceChange(e); console.log(e, "SDAADSASD") }}
                     />
                    <h4 className="dark-gray">CHF</h4>
                </div>
                <p className="light-gray">
                    {props.getTrans(props.translations.text_19)}
                </p>
            </div>
        </React.Fragment>
    )
}