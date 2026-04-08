// import 'react-app-polyfill/ie9';
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
// import 'babel-polyfill';
// import 'react-app-polyfill/ie11';
// import 'babel-polyfill';

// polyills :'(
import 'react-app-polyfill/ie11';
import 'core-js/features/array/includes';
import 'core-js/features/number/is-nan';
//

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
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true
  });
}

window.__BASE_URL__ = "https://eazytask-back.vercel.app/api/v1";       

window.__PROFILE_DEFAULT_PICTURE__ = "/images/no-profile-picture-icon-22.jpg"
window.__THUMBNAIL_DEFAULT_PICTURE__ = "/images/image_61.png"
window.__COVER_DEFAULT_PICTURE__ = "/images/image_61.png"
window.__USER_COVER_DEFAULT_PICTURE__ = "/images/user_cover.jpg"
window.__GENERAL_ERROR_VALUE__ = {
  "en": "Something unexpected happened, please check your internet connection and try again!",
  "de": "Etwas Unerwartetes ist passiert, bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es noch einmal!"
}
window.__TOAST_NO_INTERNET_VALUE__ = {
  "en": "No internet connection!",
  "de": "Keine Internetverbindung!"
}
window.__TOAST_BACK_ONLINE_VALUE__ = {
  "en": "You are back online!",
  "de": "Du bist wieder online!"
}
window.__AWS_BASE_URL__ = "https://eazytask.s3.amazonaws.com"
// window.__BASE_URL__ = "https://app.swaggerhub.com/apis/gjergjk71/easytask/1.0.0-oas3";
// window.__BASE_URL__ = "https://eazytask-back.vercel.app/api/v1"
// window.__BASE_URL__ = "http://192.168.0.102:4000/api/v1"

toast.configure({
  autoClose: 5000,
  draggable: true,
});

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
