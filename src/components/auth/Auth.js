import React from "react";
import { connect } from "react-redux";
import { postAuth } from "./Auth.redux.thunk";

const mapStateToProps = (state, ) => {
    return { auth: state.auth }
}

class Auth extends React.Component {
    constructor(props){
        super(props);
    }
    login = ({email,password}) => {
        this.props.postAuth({email,password})
    }
} 

export default connect(mapStateToProps, { postAuth })(Auth)