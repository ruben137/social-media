import { DELETE_NOTIFICATION, GET_NOTIFICATIONS, NEW_NOTIFICATION, SEARCH_USER,DELETE_MESSAGE_NOTIFICATION } from "../constants/actionTypes";
import * as api from "../api/index.js";
export const searchUser = (query) => async (dispatch) => {
  try {
    const { data } = await api.searchUser(query);
    dispatch({ type: SEARCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteNotification = (id,from,type) => async (dispatch) => {
  try {
    await api.deleteNotification(id,from,type);
    dispatch({ type: DELETE_NOTIFICATION, payload: id });
  } catch (error) {
    console.log(error.response);
  }
};

export const getNotifications = (user) => async (dispatch) => {
  try {
    const { data } = await api.getNotifications(user);
    dispatch({ type: GET_NOTIFICATIONS, payload: data });
  } catch (error) {
    console.log(error.response);
  }
};

export const newNotification = (notification) => async (dispatch) => {
  try {
    const { data } = await api.newNotification(notification);
    dispatch({ type: NEW_NOTIFICATION, payload: data });
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteMessageNotifications =
  (id, type, user) => async (dispatch) => {
    try {
     await api.deleteMessageNotifications(id, type, user);
      dispatch({ type: DELETE_MESSAGE_NOTIFICATION, payload: id });
    } catch (error) {
      console.log(error.response);
    }
  };
