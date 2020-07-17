import React from "react";

export default props => {
    return (
        <React.Fragment>
            <div className="background-title mb30">
                <h1>{props.getTrans(props.translations.text_4)}</h1>
                <h3>{props.getTrans(props.translations.text_4_1)}</h3>
                <p className="shadow__title no-contain">create a task on eazytask easy </p>
            </div>
            <h4 className="show__mobile">
            {props.getTrans(props.translations.text_4)} <br />
                <span>{props.getTrans(props.translations.text_4_1)}</span>
                <p className="show__mobile--subtitle">{props.getTrans(props.translations.text_5_1)}</p>
            </h4>

            <div className="register__form">
                <input
                    type="text"
                    placeholder={props.getTrans(props.translations.text_5)}
                    class="input"
                    value={props.description}
                    onChange={props.onDescriptionChange}
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