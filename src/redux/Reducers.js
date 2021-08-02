import * as actions from "./Consts";

const initialState = {
  data: []
};

const selectCityReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHOOSE_CITY:
      return {
        data: action.data
      };

    default:
      return state;
  }
};

export default selectCityReducer;