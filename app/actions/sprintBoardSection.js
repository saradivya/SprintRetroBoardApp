import * as actions from "./action";

export const fetchSprintBoardSections = (sprintBoard) => ({
  type: actions.FETCH_SPRINT_BOARD_SECTION,
  payload: {
    "sprintBoard": sprintBoard
  }
});
