import * as api from "../api/index.js";
import {
  CREATE,
  FETCH_ALL,
  DELETE,
  UPDATE,
  LIKE,
  FETCH_USER_NOTIFICATIONS,
  GET_USER,
  USER_NOT_FOUND,
  GET_USERS,
  FETCH_MORE,
  NO_DATA

} from "../constants/actionTypes.js";

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();
    dispatch({ type: GET_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.getUser(user);
    dispatch({ type: GET_USER, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_NOT_FOUND,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPosts = (skip) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(skip);
    if(data.length)dispatch({ type: FETCH_ALL, payload: data });
    if(!data.length) dispatch({type:NO_DATA,payload:true})

 
  } catch (error) {
    console.log(error);
  }
};



export const getUserNotifications = (user) => async (dispatch) => {
  try {
    const { data } = await api.getUserNotifications(user);
    dispatch({ type: FETCH_USER_NOTIFICATIONS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, updatedPost);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id, name) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id, name);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.response);
  }
};








