import * as actions from "./Consts";

export const chooseCity = (option, keyCode, forecast, current) => {
  console.log(option, keyCode, forecast, current);
  return {
    type: actions.CHOOSE_CITY,
    data: option,
    key: keyCode,
    fiveDaysForecast: forecast,
    currentForecast: current
  };
};

export const open = (modalBody) => {
  return {
    type: actions.OPEN_MODAL,
    body: modalBody,
  };
};

export const close = () => {
  return {
    type: actions.CLOSE_MODAL,
  };
};

export const tempToggle = (val) => {
  return {
    type: actions.CHANGE_TEMP,
    toggle: val
  };
};

export const modeToggle = (val) => {
  return {
    type: actions.CHANGE_MODE,
    toggle: val
  };
};