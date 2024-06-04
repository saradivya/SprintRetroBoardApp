import * as actions from "../actions/action";

const defaultState = {
  loading: false,
  sprintBoards: []
};

const sprintBoardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.FETCH_SPRINT_BOARD:
      return Object.assign({}, state, {
        loading: true,
      });
    case actions.UPDATE_SPRINT_BOARD_LIST:
      return Object.assign({}, state, {
        loading: false,
        sprintBoards: action.response,
      });
    case actions.FETCH_SPRINT_BOARD_ERROR:
      return Object.assign({}, state, {
        loading: false,
        sprintBoards: action.error,
      });
    default:
      return state;
  }
};

export default sprintBoardReducer;
