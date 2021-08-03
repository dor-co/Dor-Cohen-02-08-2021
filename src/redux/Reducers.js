import * as actions from "./Consts";

const initialState = {
  data: [],
  key: '',
  forecast: []
};

const selectCityReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHOOSE_CITY:
      return {
        data: action.data,
        key: action.key,
        forecast: action.fiveDaysForecast
      };

    default:
      return state;
  }
};

export default selectCityReducer;