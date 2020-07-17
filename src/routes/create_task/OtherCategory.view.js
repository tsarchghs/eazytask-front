import React from "react";

export default class OtherCategory extends React.Component {
    componentDidMount(){
        this.categoryRef.focus()
    }
    render(){
        return (
            <React.Fragment>
                <div className="background-title ">
                    <h1>{this.props.getTrans(this.props.translations.text_28)}</h1>
                    <p className="shadow__title no-contain">create a task on eazytask easy </p>
                </div>
                <h4 className="show__mobile">
                {this.props.getTrans(this.props.translations.text_28)}  <br />
                </h4>
                <div action className="register__form flex-grow" style={{marginTop:60}}>
                    <input 
                        ref={ref => this.categoryRef = ref}
                        onChange={this.props.category} 
                        onChange={this.props.onCategoryChange}
                        type="text" 
                        placeholder={this.props.getTrans(this.props.translations.text_29)}
                        onKeyDown={this.props.handleInputKeyDown}  
                        className="input" 
                    />
                    {this.props.errors.map(x => (
                        <div class="register__form--error">{x}</div>
                    ))}
                </div>
            </React.Fragment>
        )
    }
}