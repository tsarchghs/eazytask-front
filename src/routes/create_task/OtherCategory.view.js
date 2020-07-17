import React from "react";

export default props => {
    return (
        <React.Fragment>
            <div className="background-title ">
                <h1>{props.getTrans(props.translations.text_28)}</h1>
                <p className="shadow__title no-contain">create a task on eazytask easy </p>
            </div>
            <h4 className="show__mobile">
            {props.getTrans(props.translations.text_28)}  <br />
            </h4>
            <div action className="register__form flex-grow" style={{marginTop:60}}>
                <input 
                    onChange={props.category} 
                    onChange={props.onCategoryChange}
                    type="text" 
                    placeholder={props.getTrans(props.translations.text_29)}
                    className="input" 
                />
                {props.errors.map(x => (
                    <div class="register__form--error">{x}</div>
                ))}
            </div>
        </React.Fragment>
    )
}