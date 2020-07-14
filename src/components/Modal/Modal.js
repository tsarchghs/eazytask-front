import React from "react";

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
                            <a onClick={this.props.cancelOnClick || this.props.closeModal}>{this.props.cancelText || "Cancel"}</a>
                            <a onClick={this.props.acceptOnClick}>{this.props.acceptText}</a>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Modal;