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

window.__PROFILE_DEFAULT_PICTURE__ = "https://vectorified.com/images/no-profile-picture-icon-22.jpg"
window.__THUMBNAIL_DEFAULT_PICTURE__ = "/images/ustah.jpeg"
window.__COVER_DEFAULT_PICTURE__ = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSlWuZdsBd1MLX3x_qVg7EvlKju9dixFiP7IlznNK3oixcJTWHa&usqp=CAU"
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
