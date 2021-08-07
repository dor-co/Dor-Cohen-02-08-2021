import * as actions from "./Consts";

const initialState = {
  boolTemp: false,
};

const tempToggle = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHANGE_MODE:
      return {
        boolTemp: action.toggle,
      };  
    
    default:
      return state;
  }
};

export default tempToggle;