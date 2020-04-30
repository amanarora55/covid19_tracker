import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducers";
import {
  connectRouter,
  routerMiddleware,
  ConnectedRouter,
} from "connected-react-router";

import Routes from "./AppRouter";

import "./App.css";

const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};

const middleware = [routerMiddleware(history), thunk];

const store = createStore(
  rootReducer(history),
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

function App() {
  return (
    // <div className="App">
    //   {/* <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header> */}
    //   Covid 19 World Tracker
    // </div>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
