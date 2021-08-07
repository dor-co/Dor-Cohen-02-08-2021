import * as actions from "./Consts";

const initialState = {
  boolOpen: false,
  body: '',
  id: ''
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.OPEN_MODAL:
      return {
        boolOpen: true,
        body: action.body,
        id: action.id
      };
    
    case actions.CLOSE_MODAL:
        return{
            boolOpen: false
        };  

    default:
      return state;
  }
};

export default modalReducer;