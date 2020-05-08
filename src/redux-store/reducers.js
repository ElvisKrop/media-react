import {
  USER_LOADING,
  USER_LOADED,
  USER_LOAD_FAIL,
  LOG_OUT_USER,
  USER_UPDATING
} from "./constants";

const initialState = {
  user: {},
  loading: false,
  errors: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };

    case USER_LOADED:
      const { token, ...otherUserFields } = action.payload;
      localStorage.setItem("mrToken", token);
      return {
        ...state,
        loading: false,
        user: otherUserFields
      };

    case USER_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case USER_UPDATING:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          ...action.payload
        }
      };

    case LOG_OUT_USER:
      localStorage.clear();
      return {
        ...state,
        user: {}
      };

    default:
      return {
        ...state
      };
  }
};

export default reducer;
