import * as actions from "./Consts";

export const chooseCity = (option, keyCode, forecast) => {
  return {
    type: actions.CHOOSE_CITY,
    data: option,
    key: keyCode,
    fiveDaysForecast: forecast
  };
};

// export const getData = (movie) => {
//   return {
//     type: actions.GET_MOVIES_DATA,
//     data: movie
//   };
// };