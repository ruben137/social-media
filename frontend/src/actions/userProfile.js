import * as api from "../api/index.js";
import { FETCH_USER_POST, FOLLOW, FOLLOW_REQUEST, UPDATE_DESCRIPTION } from "../constants/actionTypes";

export const follow = (id) => async (dispatch) => {
  dispatch({ type: FOLLOW_REQUEST, payload: { id } });
  try {
    const { data } = await api.follow(id);
    dispatch({ type: FOLLOW, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateDescription = (id, newDescription) => async (dispatch) => {
  try {
    const { data } = await api.updateDescription(id, newDescription);

    dispatch({ type: UPDATE_DESCRIPTION, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPosts = (user) => async (dispatch) => {
  try {
    const { data } = await api.getUserPosts(user);
    dispatch({ type: FETCH_USER_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};



