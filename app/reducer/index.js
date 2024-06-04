import { combineReducers } from "redux";
import sprintBoardReducer from "./sprintBoardReducer";
import sprintBoardSectionReducer from './sprintBoardSectionReducer';
import snackBarReducer from "./snackBarReducer";

const reducer = combineReducers({
  sprintBoardReducer: sprintBoardReducer,
  sprintBoardSectionReducer: sprintBoardSectionReducer,
  snackBarReducer: snackBarReducer,
});
export default reducer;
