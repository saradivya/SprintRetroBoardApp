import * as actions from "../actions/action";

const defaultState = {
  loading: false,
  sprintBoardSections: [],
};

const sprintBoardSectionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.FETCH_SPRINT_BOARD_SECTION:
      return Object.assign({}, state, {
        loading: true,
      });
    case actions.UPDATE_SPRINT_BOARD_SECTION_LIST:
      return Object.assign({}, state, {
        loading: false,
        sprintBoardSections: action.response,
      });
    case actions.FETCH_SPRINT_BOARD_SECTION_ERROR:
      return Object.assign({}, state, {
        loading: false,
        sprintBoardSectionError: action.error,
      });
    default:
      return state;
  }
};

export default sprintBoardSectionReducer;
