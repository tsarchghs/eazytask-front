import React from "react";

export default props => {
    return (
        <React.Fragment>
            <div className="background-title ">
                <h1>Locate</h1>
                <h3>your task</h3>
                <p className="shadow__title no-contain">create a task on eazytask easy </p>
            </div>
            <h4 className="show__mobile">
                Locate  <br />
                <span>your task</span>
            </h4>
            <div className="locate-section">
                <div className="flex-grow input__group">
                    <input value={props.address} onChange={props.onAddressChange} type="text" className="input gray" placeholder="Address" />
                    <div className="two__inputs">
                        <input value={props.zipCode} onChange={props.onZipCodeChange} type="text" className="input gray" placeholder="ZIP" />
                        <input value={props.city} onChange={props.onCityChange} type="text" className="input gray" placeholder="Town" />
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
    return (
        <React.Fragment>
            <h4 className="show__mobile">
                Locate your <br />
                <span>Task</span>
            </h4>
            <div className="locate-section">
                <div className="flex-grow input__group">
                    <div className="two__inputs">
                        <input value={props.zipCode} onChange={props.onZipCodeChange} type="text" className="input gray" placeholder="ZIP" />
                        <input value={props.city} onChange={props.onCityChange} type="text" className="input gray" placeholder="Town" />
                    </div>
                    <input value={props.address} onChange={props.onAddressChange} type="text" className="input gray" placeholder="Address" />
                </div>
            </div>
            <div className="flex-grow img-wrapper flex aic jcc">
                <img className="img__mobile " src="../../../assets/toolkit/images/checklist.png" alt="" />
            </div>
        </React.Fragment>
    )
}