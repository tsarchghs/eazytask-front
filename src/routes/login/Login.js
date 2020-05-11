import React from "react";
import { connect } from "react-redux";
import { postAuth } from "./Login.redux.thunk.js";
import LoginForm from "./LoginForm.view";
import { POST_AUTH } from "./Login.redux.actionTypes";
import Button  from "../../components/button";
import { Redirect } from "react-router-dom";
import LoginRegisterHeader from "../../components/loginRegisterHeader";

const mapStateToProps = (state) => {
    return { auth: state.auth }
}

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    onChange = property => e => this.setState({
        [property]: e.target.value
    }); 
    onSubmit = e => {
        e.preventDefault();
        this.props.postAuth({ email: this.state.email, password: this.state.password })
    }
    getErrors = () => {
        if (this.props.auth && this.props.auth[POST_AUTH])
            if (this.props.auth[POST_AUTH].errors) return this.props.auth[POST_AUTH].errors
        return []
    }
    render(){
        if (this.props.auth.isAuthenticated) return <Redirect to="/" />
        return (
            <React.Fragment>
                <LoginRegisterHeader/>
                <LoginForm 
                    email={{
                        value: this.state.email,
                        onChange: this.onChange("email")
                    }} 
                    password={{
                        value: this.state.password,
                        onChange: this.onChange("password")
                    }}
                    errors={this.getErrors()}
                    onSubmit={this.onSubmit}
                />
                <Button value="Go to: register" href="/register"/>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, { postAuth })(Login)