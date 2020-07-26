import React from "react";

export default class Description extends React.Component {
    componentDidMount(){
        this.descriptionRef.focus()
    }
    render(){
        return (
            <React.Fragment>
                <div className="background-title mb30">
                    <h1>{this.props.getTrans(this.props.translations.text_4)}</h1>
                    <h3>{this.props.getTrans(this.props.translations.text_4_1)}</h3>
                    <p className="shadow__title no-contain">create a task on eazytask easy </p>
                </div>
                <h4 className="show__mobile">
                {this.props.getTrans(this.props.translations.text_4)} <br />
                    <span>{this.props.getTrans(this.props.translations.text_4_1)}</span>
                    <p className="show__mobile--subtitle">{this.props.getTrans(this.props.translations.text_5_1)}</p>
                </h4>
    
                <div className="register__form" style={{
                    position: "relative",
                    marginTop: 0,
                    paddingBottom: 100
                }}>
                    <textarea
                        ref={ref => this.descriptionRef = ref}
                        type="text"
                        placeholder={this.props.getTrans(this.props.translations.text_5)}
                        // onKeyDown={this.props.handleInputKeyDown}  
                        class="textarea"
                        value={this.props.description}
                        onChange={this.props.onDescriptionChange}
                    />
                    {this.props.errors.map(x => (
                        <div class="register__form--error">{x}</div>
                    ))}
                </div>
                {/* <div className="flex-grow img-wrapper flex aic jcc">
                    <img className="img__mobile " src="/images/startup.png" alt="" />
                </div> */}
            </React.Fragment>
        )
    }
}