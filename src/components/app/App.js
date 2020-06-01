import React from "react";
import { connect } from "react-redux";
import { getAuth, logout } from "../../actions/auth";
import Routes from "../../routes";
import { withRouter, Redirect } from "react-router-dom";
import { compose } from "recompose";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: "",
    };
  }
  componentDidMount() {
    // localStorage.setItem("eazytask:token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU4OTk2ODE4MH0.z0OURNRh2ghGEgtzG7xbAc3U_gFQ_GikNiBEpzW63Lc");
    this.props.getAuth();
  }

  changeImg = () => {
    this.setState({
      isActive: !this.state.isActive,
    });
    console.log(this.state.isActive);
  };

  render() {
    // if (
    //   this.props.auth.profile && 
    //   !this.props.auth.profile.setupCompleted && 
    //   this.props.history.location.pathname !== "/setup"
    // ) return <Redirect to="/setup" />
    return (
      <React.Fragment>
      {/* {JSON.stringify(this.props.auth)} */}
        {/* In App.js ->  */}
        {/* {this.props.auth.isAuthenticated
          ? "isAuthenticated"
          : "Not isAuthenticated"} */}
        {/* {this.props.auth.isAuthenticated && (
          <React.Fragment>
            <button onClick={this.props.logout}>Logout</button>
            <br />
          </React.Fragment>
        )}{" "} */}
        <Routes/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const enhance = compose(
  withRouter,
  connect(mapStateToProps, { getAuth, logout })
)

export default enhance(App);
