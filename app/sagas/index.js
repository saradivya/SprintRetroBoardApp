import { takeLatest } from "redux-saga/effects";
import * as actions from "../actions/action";
import fetchSprintBoard from "./fetchSprintBoard";
import fetchSprintBoardSection from "./fetchSprintBoardSection";


export default function* rootSaga() {
  yield takeLatest(actions.FETCH_SPRINT_BOARD, fetchSprintBoard);
  yield takeLatest(actions.FETCH_SPRINT_BOARD_SECTION, fetchSprintBoardSection);
}
