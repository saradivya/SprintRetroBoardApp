import * as actions from "../actions/action";

const defaultState = {
  visible: false,
  snackbarMessage: undefined,
};

const snackBarReducer = (state = defaultState, action) => {
 switch (action.type) {
    case actions.SET_SNACKBAR_MESSAGE:
      return Object.assign({}, state, {
        visible: true,
        snackbarMessage: action.payload.snackbarMessage,
      });
    case actions.REMOVE_SNACKBAR_MESSAGE:
      return Object.assign({}, state, {
        visible: false,
        snackbarMessage: undefined,
      });
    default:
      return state;
  }
};

export default snackBarReducer;
