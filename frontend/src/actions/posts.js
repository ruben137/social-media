import * as api from "../api/index.js";
import {
  CREATE,
  FETCH_ALL,
  DELETE,
  UPDATE,
  FETCH_USER_NOTIFICATIONS,
  GET_USER,
  USER_NOT_FOUND,
  GET_USERS,
  NO_DATA,
  COMMENT_POST,
  GET_COMMENTS,
  DELETE_COMMENT,
  LIKE_COMMENT,
  GET_LIKES,
  LIKE_POST,
  DISLIKE_POST,
  CLEAN_POST_STATE,
  GET_POSTS_REQUEST
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
    dispatch({type:GET_POSTS_REQUEST})
    const { data } = await api.fetchPosts(skip);
    if (data.length) dispatch({ type: FETCH_ALL, payload: data });
    if (!data.length) dispatch({ type: NO_DATA, payload: true });
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

export const getComments = (id) => async (dispatch) => {
  try {
    const { data } = await api.getComments(id);
    dispatch({ type: GET_COMMENTS, payload: data, id });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost =
  ({ comment, from, commentId, postId }) =>
  async (dispatch) => {
    try {
      const { data } = await api.commentPost({
        comment,
        from,
        commentId,
      });
      dispatch({ type: COMMENT_POST, payload: data, id: postId });
    } catch (error) {
      console.log(error);
    }
  };

export const deleteComment =
  ({ commentId, id }) =>
  async (dispatch) => {
    try {
      const { data } = await api.deleteComment(commentId);
      dispatch({ type: DELETE_COMMENT, payload: data, id });
    } catch (error) {
      console.log(error);
    }
  };

export const likeComment =
  ({ postId, commentId }) =>
  async (dispatch) => {
    try {
      const { data } = await api.likeComment(commentId);
      dispatch({ type: LIKE_COMMENT, payload: data, id: postId });
    } catch (error) {
      console.log(error);
    }
  };

export const getLikes = (id) => async (dispatch) => {
  try {
    const { data } = await api.getLikes(id);
    dispatch({ type: GET_LIKES, payload: data, id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost =
  ({ from, likeId }) =>
  async (dispatch) => {
    try {
      const { data } = await api.likePost({
        from,
        likeId,
      });
      dispatch({ type: LIKE_POST, payload: data, id: likeId });
    } catch (error) {
      console.log(error);
    }
  };

export const dislikePost = (id, postId) => async (dispatch) => {
  try {
    const { data } = await api.dislikePost(id);
    dispatch({ type: DISLIKE_POST, payload: data, id: postId });
  } catch (error) {
    console.log(error);
  }
};

export const cleanPostState = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAN_POST_STATE });
  } catch (error) {
    console.log(error);
  }
};
