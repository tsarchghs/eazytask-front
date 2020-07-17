import React from "react";

export default class Name extends React.Component {
    componentDidMount(){
        this.nameRef.focus()
    }
    render(){
        return (
            <React.Fragment>
                <div className="background-title mb30">
                    <h1>{this.props.getTrans(this.props.translations.text_1)}</h1>
                    <h3>{this.props.getTrans(this.props.translations.text_1_1)}</h3>
                    <p className="shadow__title no-contain">create a task on eazytask easy </p>
                </div>
                <h4 className="show__mobile">
                    {this.props.getTrans(this.props.translations.text_1)}<br />
                    <span>{this.props.getTrans(this.props.translations.text_1_1)}</span>
                </h4>
                <div className="register__form">
                    <input 
                        ref={ref => this.nameRef = ref}
                        type="text"
                        placeholder={this.props.getTrans(this.props.translations.text_3)}
                        class="input"
                        value={this.props.name}
                        onChange={this.props.onNameChange}
                        onKeyDown={this.props.handleInputKeyDown}  
                    />
                    {this.props.errors.map(x => (
                        <div class="register__form--error">{x}</div>
                    ))}
                </div>
                <div className="flex-grow img-wrapper flex aic jcc">
                    <img className="img__mobile " src="/images/startup.png" alt="" />
                </div>
            </React.Fragment>
        )
    }
}