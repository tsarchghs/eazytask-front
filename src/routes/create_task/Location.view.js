import React from "react";

export default class Location extends React.Component {
    componentDidMount(){
        this.addressRef.focus()
    }
    render(){
        return (
            <React.Fragment>
                <div className="background-title ">
                    <h1>{this.props.getTrans(this.props.translations.text_10)}</h1>
                    <h3>{this.props.getTrans(this.props.translations.text_11)}</h3>
                    <p className="shadow__title no-contain">create a task on eazytask easy </p>
                </div>
                <h4 className="show__mobile">
                    {this.props.getTrans(this.props.translations.text_10)}  <br />
                    <span>{this.props.getTrans(this.props.translations.text_11)}</span>
                </h4>
                <div className="locate-section" style={{ position: "relative" }}>
                    <div className="flex-grow input__group">
                        <input
                            onKeyDown={this.props.handleInputKeyDown}  
                            ref={ref => this.addressRef = ref}
                            value={this.props.address} onChange={this.props.onAddressChange} type="text" className="input gray" 
                            placeholder={this.props.getTrans(this.props.translations.text_12)} />
                        <div className="two__inputs">
                            <input
                                onKeyDown={this.props.handleInputKeyDown}  
    
                                value={this.props.zipCode} onChange={this.props.onZipCodeChange} type="text" className="input gray" 
                                placeholder={this.props.getTrans(this.props.translations.text_13)} />
                            <input
                                onKeyDown={this.props.handleInputKeyDown}  
    
                                value={this.props.city} onChange={this.props.onCityChange} type="text" className="input gray" 
                                placeholder={this.props.getTrans(this.props.translations.text_14)} />
                        </div>
                        {this.props.errors.map(x => (
                            <div class="register__form--error">{x}</div>
                        ))}
                    </div>
                </div>
                <div className="flex-grow img-wrapper flex aic jcc ct-mob w45">
                    <img className="img__mobile " src="/images/stand.png" alt="" />
                </div>
            </React.Fragment>
        )
        
    }
}