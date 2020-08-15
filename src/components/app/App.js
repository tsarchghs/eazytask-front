import React from "react";
import { connect } from "react-redux";
import { getAuth, logout } from "../../actions/auth";
import Routes from "../../routes";
import { withRouter, Redirect } from "react-router-dom";
import { compose } from "recompose";
import ExpectedPriceView from "../../routes/create_task/ExpectedPrice.view";
import Detector from "../OnlineDetector/OnlineDetector";
import { toast } from "react-toastify";
import EventListener from "../EventListener"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: "",
      locations: []
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      // this.setState(prevState => {
      //   console.log("ROUTE CHANGE", prevProps.location)
      //   if (prevState.locations.indexOf(prevProps.location) === -1)
      //     prevState.locations.push(prevProps.location)
      //   return { ...prevState, locations: [ ...prevState.locations ] }
      // })
    }
  }
  goBack = () => {
    console.log("GOBACK")
    if (this.state.locations.length) {
      try {
        this.props.history.goBack();
      } catch (err) {
        this.props.history.push("/")
      } 
    } else {
      this.props.history.push("/")
    }
    this.setState(prevState => {
      prevState.locations.pop();
      return { ...prevState, locations: [ ...prevState.locations ] }
    })
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
    console.log("this.state.locations.length",this.state.locations.length)
    return (
      <React.Fragment>
        <Routes goBack={this.goBack}/>
        <Detector>
          {({ online }) => {
            if (!online) {
              toast.error(window.__TOAST_NO_INTERNET_VALUE__[localStorage.getItem("app_lang")], { toastId: "InternetError" })
              this.wasDisconnected = true;
            }
            if (online && this.wasDisconnected) {
              toast.success(window.__TOAST_BACK_ONLINE_VALUE__[localStorage.getItem("app_lang")], { toastId: "RECONNECTED" })
              this.wasDisconnected = false;
            }
            return (
              <EventListener
                target="window"
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
              />
            )
          }}
        </Detector>
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
