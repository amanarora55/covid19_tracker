import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import covid from "./covid";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    covid: covid,
  });
