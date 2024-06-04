import { call, put } from "redux-saga/effects";
import * as actions from "../actions/action";

const getSprintBoardSection = async (sprintBoard) => {
  console.log("Call API");
  const response = await fetch(
 `http://localhost:8080/sprint/section/board/${sprintBoard}`
  );
  const json = await response.json();
  return json;
};

export default function* fetchSprintBoardSection(action) {
  try {
    const response = yield call(getSprintBoardSection, action.payload.sprintBoard);
    yield put({
      type: actions.UPDATE_SPRINT_BOARD_SECTION_LIST,
      response: response,
    });
  } catch (error) {
    yield put({
      type: actions.FETCH_SPRINT_BOARD_SECTION_ERROR,
      error: error,
    });
  } 
}
