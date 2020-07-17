import React from "react";

export default props => {
    return (
        <React.Fragment>
            <div className="background-title ">
                <h1>{props.getTrans(props.translations.text_10)}</h1>
                <h3>{props.getTrans(props.translations.text_11)}</h3>
                <p className="shadow__title no-contain">create a task on eazytask easy </p>
            </div>
            <h4 className="show__mobile">
                {props.getTrans(props.translations.text_10)}  <br />
                <span>{props.getTrans(props.translations.text_11)}</span>
            </h4>
            <div className="locate-section">
                <div className="flex-grow input__group">
                    <input

                        value={props.address} onChange={props.onAddressChange} type="text" className="input gray" 
                        placeholder={props.getTrans(props.translations.text_12)} />
                    <div className="two__inputs">
                        <input

                            value={props.zipCode} onChange={props.onZipCodeChange} type="text" className="input gray" 
                            placeholder={props.getTrans(props.translations.text_13)} />
                        <input

                            value={props.city} onChange={props.onCityChange} type="text" className="input gray" 
                            placeholder={props.getTrans(props.translations.text_14)} />
                    </div>
                    {props.errors.map(x => (
                        <div class="register__form--error">{x}</div>
                    ))}
                </div>
                <div className="flex-grow img-wrapper flex aic jcc">
                    <img className="img__mobile " src="/images/stand.png" alt="" />
                </div>
            </div>
        </React.Fragment>
    )
}