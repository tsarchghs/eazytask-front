import React from "react";

export default props => {
    return (
        <React.Fragment>
            <div className="background-title mb30">
                <h1>{props.getTrans(props.translations.text_1)}</h1>
                <h3>{props.getTrans(props.translations.text_1_1)}</h3>
                <p className="shadow__title no-contain">create a task on eazytask easy </p>
            </div>
            <h4 className="show__mobile">
                {props.getTrans(props.translations.text_1)}<br />
                <span>{props.getTrans(props.translations.text_1_1)}</span>
            </h4>
            <div className="register__form">
                <input 
                    type="text"
                    placeholder={props.getTrans(props.translations.text_3)}
                    class="input"
                    value={props.name}
                    onChange={props.onNameChange}    
                />
                {props.errors.map(x => (
                    <div class="register__form--error">{x}</div>
                ))}
            </div>
            <div className="flex-grow img-wrapper flex aic jcc">
                <img className="img__mobile " src="/images/startup.png" alt="" />
            </div>
        </React.Fragment>
    )
}