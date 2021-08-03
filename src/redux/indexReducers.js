import selectCityReducer from "../redux/Reducers";
import modalReducer from "../redux/ModalReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  selectCityReducer,
  modalReducer
});

export default allReducers;