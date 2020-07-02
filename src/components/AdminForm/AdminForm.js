import React from "react";

class AdminForm extends React.Component {
    constructor(props){
        super(props);
        let data = {}
        if (!this.props.data){
            let inputs = props.inputs;
            for (let input_name of inputs) data[input_name] = ""
        } else data = this.props.data;
        this.state = { data }
        console.log({data},233)

    }
    onSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.data);
    }
    onChange = key => e => {
        e.preventDefault();
        let { value } = e.target;
        this.setState(prevState => {
            prevState.data[key] = value;
            return { ...prevState, data: { ...prevState.data } }
        })
    }
    render(){
        let { h4_content, button_content } =  this.props;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-md-8">
                        <center />
                        <div className="card">
                            <div className="card-header">
                                <h4 className="mb-0">{h4_content}</h4>
                            </div>
                            <div
                                className="col-md-12 mb-12"
                                style={{ marginTop: "30px" }}
                            >
                                {
                                    this.props.inputs.map(input_name => (
                                        <div>
                                            <label>{input_name}</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                required
                                                value={this.state.data[input_name]}
                                                onChange={this.onChange(input_name)}
                                            />
                                        </div>
                                    ))
                                }
                                <hr className="mb-12" />
                                <button
                                    className="btn btn-primary btn-lg btn-block"
                                    type="submit"
                                    style={{ marginBottom: "20px" }}
                                >
                                    {button_content}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default AdminForm;