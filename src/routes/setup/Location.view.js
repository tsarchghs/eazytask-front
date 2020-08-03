import React from "react";

export default class Location extends React.Component {
    componentDidMount(){
        this.zipRef.focus()
    }
    render(){
        return (
            <React.Fragment>
                <div className="background-title mb5">
                    <h1>{this.props.getTrans(this.props.translations.text_8)}</h1>
                    <p className="shadow__title">setup your account</p>
                </div>
                <h5 className="show__mobile"><img src="/images/Vector.png" alt="" style={{ width: '20px', marginRight: '10px' }} />Location</h5>
                <div className="mobile__dots">
                    <span className="dot active"></span>
                    <span className="dot active"></span>
                    <span className="dot" />
                </div>
                <h4 className="mb30">{this.props.getTrans(this.props.translations.text_9)}</h4>
                <div className="flex-grow input__group" style={{display:"block", marginTop: 55}}>
                    <input 
                        onKeyDown={this.props.handleInputKeyDown}

                    value={this.props.address} onChange={this.props.onAddressChange} type="text" className="input gray" 
                    placeholder={this.props.getTrans(this.props.translations.text_12)} />
                    <div className="two__inputs">
                        <input
                            onKeyDown={this.props.handleInputKeyDown}

                         ref={ref => this.zipRef = ref} value={this.props.zipCode} onChange={this.props.onZipCodeChange} type="text" className="input gray" 
                        placeholder={this.props.getTrans(this.props.translations.text_10)} />
                        <input 
                            onKeyDown={this.props.handleInputKeyDown}

                        value={this.props.city} onChange={this.props.onCityChange} type="text" className="input gray" 
                        placeholder={this.props.getTrans(this.props.translations.text_11)} />
                    </div>
    
                </div>
            </React.Fragment>
        )
    }
}