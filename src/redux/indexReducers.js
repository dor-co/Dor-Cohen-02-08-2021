import selectCityReducer from "../redux/Reducers";
import modalReducer from "../redux/ModalReducer";
import tempToggle from "../redux/TempReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  selectCityReducer,
  modalReducer,
  tempToggle
});

export default allReducers;