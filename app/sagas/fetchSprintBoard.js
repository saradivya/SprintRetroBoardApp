import { call, put, takeLatest, all } from "redux-saga/effects";
import * as actions from "../actions/action";

const getSprintBoards =  async () => {
  console.log("Call API");
 const response = await fetch(
   "https://sprintretroboardapp.onrender.com/sprint/retroBoard"
 );
  const json = await response.json();
  return json;
};

export default function* fetchSprintBoard() {
  try {
    const response = yield call(getSprintBoards);
    yield put({
      type: actions.UPDATE_SPRINT_BOARD_LIST,
      response: response,
    });
  } catch (error) {
    yield put({
      type: actions.FETCH_SPRINT_BOARD_ERROR,
      error: error,
    });
  }
}
