import React from "react";
import axios from "../../utils/axios";
import { Redirect, withRouter } from "react-router-dom";
import * as Yup from "yup";

class CodeInputs extends React.Component {
    render(){
        let inputs = []
        for (let x=0;x<6;x++) inputs.push(
            <input 
                ref={ref => this["input_" + x] = ref} 
                style={{ width: "4%", marginLeft: 5 }} 
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
            values: []
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
    onChange = x => e => {
        let { value } = e.target;
        this.setState(prevState => {
            prevState.values[x] = value;
            return prevState;
        })
    }
    render(){
        if (!this.props.phone_number) return "!this.props.phone_number"
        if (this.state.success) this.props.mainButtonClick()
        let { loading, error } = this.state;
        return (
            <div>
                {
                    error && "Invalid code"
                }
                <CodeInputs values={this.state.values} onChange={this.onChange}/>
                <button 
                    onClick={!loading && this.submit}
                >{loading ? "Loading..." : "Submit"}</button>
            </div>
        )
    }
}

export default withRouter(PhoneVerificationCode);