import * as actions from "./action";

export const setSnackBarMessage = (snackbarMessage) => ({
  type: actions.SET_SNACKBAR_MESSAGE,
  payload: {
    snackbarMessage: snackbarMessage,
  },
});

export const removeSnackBarMessage = () => ({
  type: actions.REMOVE_SNACKBAR_MESSAGE,

});