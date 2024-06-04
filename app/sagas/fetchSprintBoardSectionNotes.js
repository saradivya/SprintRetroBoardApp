import { call, put } from "redux-saga/effects";
import * as actions from "../actions/action";

const getSprintBoardSectionNotes = async (sectionName) => {
  console.log("Call API");
  const response = await fetch(
    `http://localhost:8080/sprint/section/${sectionName}/notes`
  );
  const json = await response.json();
  return json;
};

export default function* fetchSprintBoardSectionNotes(action) {
  try {
    let sectionName = action.payload.sectionName;
    const response = yield call(
      getSprintBoardSectionNotes,
      sectionName
    );
    yield put({
      type: actions.UPDATE_SPRINT_BOARD_SECTION_NOTES_LIST,
      response: `{
        ${sectionName} : ${response},
      }`
    });
  } catch (error) {
    yield put({
      type: actions.FETCH_SPRINT_BOARD_SECTION_NOTES_ERROR,
      error: error,
    });
  }
}
