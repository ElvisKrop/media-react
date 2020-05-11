import {
  USER_LOADED,
  USER_LOADING,
  USER_LOAD_FAIL,
  USER_UPDATING,
  CLEAR_ERRORS,
  LOG_OUT_USER
} from "./constants";

export const userLoaded = (user) => ({
  type: USER_LOADED,
  payload: user
});

export const userLoading = () => ({
  type: USER_LOADING
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const userUpdate = (user) => ({
  type: USER_UPDATING,
  payload: user
});

export const userLoadFail = (errors) => ({
  type: USER_LOAD_FAIL,
  payload: errors
});

export const userLogOut = () => ({
  type: LOG_OUT_USER
});
