import React from "react";
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

class VerificationCode extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            values: []
        }
        this.valuesSchema = Yup.array(Yup.string().required().min(1).max(1)).test("len", "Unspecified", val => val.length == 6)
    }
    onChange = x => e => {
        let { value } = e.target;
        this.setState(prevState => {
            prevState.values[x] = value;
            return prevState;
        })
    }
    onSubmit = async e => {
        e.preventDefault();
        let isValid = await this.valuesSchema.isValid(this.state.values);
        console.log({isValid});
        if (!isValid) return;
        let code = Number(this.state.values.join(""))
        this.props.onSubmit(code)
    }
    render(){
        console.log(this.state.values);
        return (
            <React.Fragment>
                Reset account <br /><br />
                Verification code<br />
                A code has been to your email, please enter it here<br /> <br />
                <form onSubmit={this.onSubmit}>
                    <div style={{ display: "flex" }}>
                        <CodeInputs
                            onChange={this.onChange}
                            values={this.state.values}
                        />
                    </div>
                    <button type={this.props.buttonType} style={this.props.buttonStyle}>Submit</button>
                </form>
            </React.Fragment>
        )
    }
}

export default VerificationCode;