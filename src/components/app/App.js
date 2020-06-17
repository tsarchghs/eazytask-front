// import React from 'react';
// import styled from 'styled-components';
// import { Controller, Scene } from 'react-scrollmagic';

// const MultipleControllersStyled = styled.div`
//   .section {
//     height: 100vh;
//   }
//   #container1, #container2 {
//     width: 600px;
//     height: 400px;
//     overflow: auto;
//   }
  
//   .sticky {
//     background-color: red;
//     width: 100%;
//     & div {
//       padding: 30px;
//     }
//   }
  
//   .blue {
//     background-color: blue;
//   }
// `;

// const MultipleControllers = () => (
//   <MultipleControllersStyled>
//     <div id="container1">
//       <Controller container="#container1">
//         <div className="section" />
//         <Scene duration={600} pin={true}>
//           {props => {
//             let step;
//             if (props < 0.3) step = 1
//             else if (props < 0.6) step = 2
//             else if (props < 1) step = 3

//             return <div>{step}</div>
//           }}
//         </Scene>
//         <div className="section" />
//       </Controller>
//     </div>
//     <div id="container2">
//       <Controller container="#container2">
//         <div className="section" />
//         <Scene duration={600} pin={true}>
//           <div className="sticky"><div>Pin Test</div></div>
//         </Scene>
//         <div className="section" />
//       </Controller>
//     </div>
//   </MultipleControllersStyled>
// );

// export default MultipleControllers;

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
