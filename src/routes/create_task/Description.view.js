import React from "react";

export default props => {
    return (
        <React.Fragment>
            <div className="background-title mb30">
                <h1>Describe</h1>
                <h3>task</h3>
                <p className="shadow__title no-contain">create a task on eazytask easy </p>
            </div>
            <h4 className="show__mobile">
                Describe <br />
                <span>task</span>
                <p className="show__mobile--subtitle">Please add relevant information about trasnport, equipment and all other information that the taskers may need</p>
            </h4>

            <div className="register__form">
                <input
                    type="text"
                    placeholder="Description..."
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