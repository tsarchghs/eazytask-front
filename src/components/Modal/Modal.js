import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Modal extends React.Component {
    constructor(props){
        super(props);
        this.wrapperRef = React.createRef();
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside = event => {
        console.log("this.props.isActive", this.props.isActive)
        if (!this.props.isActive) return;

        console.log(event,this.wrapperRef)
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.props.closeModal()
        }
    }
    render(){
        return (
            <div style={{ display: this.props.isActive ? "" : "none"}} class="pop-up">
                <div ref={this.wrapperRef} class="pop-up__card">
                    <h5>{this.props.title}</h5>
                    <p>{this.props.description}</p>
                    {
                        !this.props.hide_buttons &&
                        <div class="pop-up__buttons">
                            <a onClick={this.props.cancelOnClick || this.props.closeModal}>{this.props.cancelText || 
                                this.props.common.cancel[this.props.app_lang]
                            }</a>
                            <a onClick={this.props.acceptOnClick}>{this.props.acceptText}</a>
                        </div>
                    }
                    {
                        this.props.accountSettingsButton && 
                        <div class="pop-up__buttons">
                            <a style={{ fontSize: 15 }} onClick={this.props.cancelOnClick || this.props.closeModal}>{this.props.cancelText || 
                            this.props.common.cancel[this.props.app_lang]}</a>
                            <Link style={{ fontSize: 15 }} to="/settings/change_preferences">
                                {this.props.common.account_settings[this.props.app_lang]}
                            </Link>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

let mapStateToProps = state => ({
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
})
export default connect(mapStateToProps)(Modal);