import * as actions from "./Consts";

export const chooseCity = (option) => {
  return {
    type: actions.CHOOSE_CITY,
    data: option
  };
};

// export const getData = (movie) => {
//   return {
//     type: actions.GET_MOVIES_DATA,
//     data: movie
//   };
// };