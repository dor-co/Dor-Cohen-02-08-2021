import * as actions from "./Consts";

const initialState = {
  data: [],
  key: '',
  forecast: [],
  currentForecast: []
};

const selectCityReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHOOSE_CITY:
      return {
        data: action.data,
        key: action.key,
        forecast: action.fiveDaysForecast,
        currentForecast: action.currentForecast
      };

    default:
      return state;
  }
};

export default selectCityReducer;