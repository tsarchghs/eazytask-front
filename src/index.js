import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./components/app";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
// import "foundation-sites/dist/css/foundation.min.css";
// import "../src/4.helpers/normalize.css";
import "../src/4.helpers/helper.scss";
import "../src/utils/fonts/product-sans.ttf";
import "../src/utils/fonts/product-sans-bold.ttf";
import { Helmet } from "react-helmet";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
