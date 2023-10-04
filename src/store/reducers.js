import { combineReducers } from "redux";

// Front
import Login from "./Auth/reducer";
import Contact from "./Contact/reducer";
import Pagination from "./Pagination/reducers";
//

const rootReducer = combineReducers({
  Login,
  Contact,
  Pagination,
});

export default rootReducer;
