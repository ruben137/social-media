import { AUTH, AUTH_FAIL, SIGNIN_FAIL } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    dispatch({type:SIGNIN_FAIL,payload:
      error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    console.log(error)
    
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
      payload:

        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    console.log(error);
  }
};
