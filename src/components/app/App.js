import React from 'react';
import { connect } from "react-redux";
import Routes from "../../routes";

const mapStateToProps = (state,) => {
  return { auth: state.auth }
}


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return <div>
      {this.props.auth.isAuthenticated ? "isAuthenticated" : "Not isAuthenticated"}
      <Routes/>
    </div>
  }
}

export default connect(mapStateToProps)(App)