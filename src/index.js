import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";

// Components
import App from "./App";

import store from "./redux";
import {checkForExpiredToken} from "./redux/actions";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")

);
store.dispatch(checkForExpiredToken())
registerServiceWorker();
