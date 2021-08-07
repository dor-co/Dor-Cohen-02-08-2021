import * as actions from "./Consts";

export const chooseCity = (option, keyCode, forecast, current) => {
  return {
    type: actions.CHOOSE_CITY,
    data: option,
    key: keyCode,
    fiveDaysForecast: forecast,
    currentForecast: current
  };
};

export const open = (modalBody, id) => {
  return {
    type: actions.OPEN_MODAL,
    body: modalBody,
    id: id
  };
};

export const close = () => {
  return {
    type: actions.CLOSE_MODAL,
  };
};