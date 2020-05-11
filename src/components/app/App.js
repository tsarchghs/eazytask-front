import React from 'react';
import { connect } from "react-redux";
import { getAuth } from "./App.redux.thunk"
import { logout } from "../../redux/actions";
import Routes from "../../routes";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const mapStateToProps = (state,) => {
  return { auth: state.auth }
}


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  componentDidMount(){
    // Cookies.set("eazytask:token","fff");
    this.props.getAuth()
  }
  render(){
    return (
      <React.Fragment>
        In App.js -> 
        {this.props.auth.isAuthenticated ? "isAuthenticated" : "Not isAuthenticated"}
        {this.props.auth.isAuthenticated && <button onClick={this.props.logout}>Logout</button>} <br /><br />
        <br/>
        <Routes/>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, { getAuth, logout })(App)