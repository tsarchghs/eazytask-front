import React from "react";
import axios from "../../utils/axios";
import { Redirect, withRouter } from "react-router-dom";
import * as Yup from "yup";

class CodeInputs extends React.Component {
    componentDidMount(){
        this["input_0"].focus();
    }
    render(){
        let inputs = []
        for (let x=0;x<6;x++) inputs.push(
            <input 
                ref={ref => this["input_" + x] = ref} 
                type="number" 
                value={this.props.values[x]} 
                onChange={e => {
                    let { value } = e.target;
                    if (value.length > 1) e.target.value = value[value.length-1] 
                    this.props.onChange(x)(e);
                    let i;
                    if (value) i = x == 5 ? 0 : x + 1
                    else i = x == 0 ? 5 : x - 1
                    this["input_" + i].focus();
                }} 
            />
        )
        return inputs;
    }
}

class PhoneVerificationCode extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            success: false,
            loading: false,
            error: undefined,
            values: [],
            valid: false
        }
        this.valuesSchema = Yup.array(Yup.string().required().min(1).max(1)).test("len", "Unspecified", val => val.length == 6)

    }
    componentDidMount(){
        if (this.props.phone_number){
            axios.post("/users/send_phone_verification_code",{ phone_number: this.props.phone_number })
            .catch(e => console.log(e)) 
        }
    }
    submit = () => {
        this.setState({loading: true})
        let code = Number(this.state.values.join(""));
        axios.post("/users/validate_phone_verification_code",{ code })
        .then(data => this.setState({
            error: undefined,
            success: true,
            loading: false
        }))
        .catch(e => this.setState({
            error: e,
            success: false,
            loading: false
        }))

    }
    onChange = x => async e => {
        let { value } = e.target;
        let values = this.state.values;
        values[x] = value
        let valid = await this.valuesSchema.isValid(this.state.values);
        console.log("VALID",valid)
        this.setState({ values, valid })
    }
    render(){
        if (!this.props.phone_number) return "!this.props.phone_number"
        if (this.state.success) this.props.mainButtonClick()
        let { loading, error } = this.state;
        return (
            <React.Fragment>
                <div className="background-title mb5">
                    <h1>{this.props.getTrans(this.props.translations.text_20)}</h1>
                    <p className="shadow__title">{this.props.getTrans(this.props.translations.text_21)}</p>
                </div>
                <h5 className="show__mobile"><img src="/images/sign.png" alt="" style={{ width: '20px', marginRight: '10px' }} />
                    {this.props.getTrans(this.props.translations.text_21)}
                </h5>
                <div className="mobile__dots">
                    <span className="dot active"></span>
                    <span className="dot active"></span>
                    <span className="dot active" />
                </div>
                <h4 className="mb30">{this.props.getTrans(this.props.translations.text_21)}</h4>
                {
                    error && this.props.getTrans(this.props.translations.text_22)
                }
                <div className="flex-grow input__group" style={{ display: "block" }}>
                    <div className="small-input">
                        <CodeInputs values={this.state.values} onChange={this.onChange} />
                    </div>
                </div>
                <button
                    className={`button__style ${this.state.valid ? "" : "not-filled"}`}
                    // style={this.state.valid ? { backgroundColor: ""} : { backgroundColor: "darkgrey" }}
                    onClick={loading ? undefined : this.submit}
                >
                    Next
                </button>
            </React.Fragment>
        )
    }
}

export default withRouter(PhoneVerificationCode);