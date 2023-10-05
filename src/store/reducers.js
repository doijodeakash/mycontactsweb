import { combineReducers } from "redux";

// Front
import Login from "./Auth/reducer";
import Contact from "./Contact/reducer";
import Pagination from "./Pagination/reducers";
import Products from "./Product/reducer";

//

const rootReducer = combineReducers({
  Login,
  Contact,
  Pagination,
  Products,
});

export default rootReducer;
