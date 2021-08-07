import selectCityReducer from "../redux/Reducers";
import modalReducer from "../redux/ModalReducer";
import tempToggle from "../redux/TempReducer";
import modeToggle from "../redux/ModeReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  selectCityReducer,
  modalReducer,
  tempToggle,
  modeToggle
});

export default allReducers;