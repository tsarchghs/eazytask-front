import React from "react";

export default props => {
    console.log(props.expected_price,"props.expected_price")
    return (
        <React.Fragment>
            <div className="background-title">
                <h1>Expected</h1>
                <h3>price</h3>
                <p className="shadow__title no-contain">create a task on eazytask easy </p>
            </div>
            <h4 className="show__mobile">
                Expected <br />
                <span>price</span>
            </h4>
            <div className="price-section flex-grow">
                <div className="input-price flex aic jcc">
                    <input 
                        type="number"
                        value={props.expected_price}
                        onChange={e => { props.onExpectedPriceChange(e); console.log(e, "SDAADSASD") }}
                     />
                    <h4 className="dark-gray">CHF</h4>
                </div>
                <p className="light-gray">Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> Ut aliquam, malesuada velit a tristique phasellus ultrices et. </p>
            </div>
        </React.Fragment>
    )
    return (
        <React.Fragment>
            <h4 className="show__mobile">
                Expected <br />
                <span>price</span>
            </h4>
            <div className="price-section flex-grow">
                <div className="input-price flex aic jcc">
                    <input
                        type="number"
                        value={props.expected_price} 
                        onChange={e => { props.onExpectedPriceChange(e); console.log(e,"SDAADSASD") }}
                    />
                    <h4 className="dark-gray">CHF</h4>
                </div>
                <p className="light-gray">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquam, malesuada velit a tristique phasellus ultrices et. </p>
            </div>
        </React.Fragment>
    )
}