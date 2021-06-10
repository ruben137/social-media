import * as actionType from "../constants/actionTypes";

export const auth = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: null };
    case actionType.AUTH_FAIL:
      return { loading: false, error: action.payload };
    case actionType.SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

