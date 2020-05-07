import React from "react";
import { connect } from "react-redux";
import { postAuth } from "../../components/auth/Auth.redux.thunk";

const mapStateToProps = (state, ) => {
    console.log(919191,state)
    return { ...state }
}

class Login extends React.Component {
    constructor(props){
        super(props);
    }
    login = () => {
        this.props.postAuth({ email: "user@example.com", password: "string" })
    }
    render(){
        return (
            <React.Fragment>
                <button onClick={this.login}>Login</button>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, { postAuth })(Login)