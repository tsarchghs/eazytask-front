import React from "react";

export default props => {
    return (
        <React.Fragment>
            <div className="background-title mb30">
                <h1>Create</h1>
                <h3>a task</h3>
                <p className="shadow__title no-contain">create a task on eazytask easy </p>
            </div>
            <h4 className="show__mobile">
                Create a <br />
                <span>task</span>
            </h4>

            <div className="register__form">
                <input 
                    type="text"
                    placeholder="Name your task"
                    class="input"
                    value={props.name}
                    onChange={props.onNameChange}    
                />
            </div>
            <div className="flex-grow img-wrapper flex aic jcc">
                <img className="img__mobile " src="/images/startup.png" alt="" />
            </div>
        </React.Fragment>
    )
}