import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });


API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// Posts
export const fetchPosts = (skip) => API.get(`/posts/${skip}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (like) => API.post("/likes", like);
export const dislikePost = (id) => API.delete(`/likes/${id}`);
export const getLikes = (id) => API.get(`/likes/${id}`);

export const getComments = (id) => API.get(`/comments/${id}`);
export const commentPost = (comment) => API.post(`/comments`, comment);
export const deleteComment = (id) => API.delete(`/comments/${id}`);
export const likeComment = (id) => API.patch(`/comments/${id}`);

// User
export const getUsers = () => API.get("/userProfile");
export const getUser = (user) => API.get(`/userProfile/${user}`);
export const getUserPosts = (user) => API.get(`/userProfile/userPosts/${user}`);
export const follow = (id) => API.put(`/userProfile/follow/${id}`);
export const getUserNotifications = (user) =>
  API.get(`/posts/notifications/${user}`);
export const updateDescription = (id, updatedDescription) =>
  API.put(`/userProfile/${id}`, updatedDescription);
export const updateProfilePic = (pic) =>
  API.post("/profile/profilepic", pic, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const getProfilePic = (user) => API.get(`/userProfile/getpic/${user}`);

// Navigation
export const searchUser = (query) => API.get(`/userProfile/search/${query}`);
export const getNotifications = (user) =>
  API.get(`/posts/notifications/${user}`);
export const newNotification = (notification) =>
  API.post(`/posts/newNotification`, notification);
export const deleteNotification = (id, from, type) =>
  API.delete(`/posts/notifications/${id}/${from}/${type}`);
export const deleteMessageNotifications = (id, type, from) =>
  API.delete(`/messages/deleteMessageNotifications/${id}/${type}/${from}`);

// Messages
export const getMessages = (id, receiver) =>
  API.get(`/messages/allMessages/${id}/${receiver}`);
export const getLastMessages = () => API.get(`/messages/lastMessages`);
export const createConversation = (receiver) =>
  API.post(`/messages/conversations`, { receiver });
export const getConversations = () => API.get(`/messages/conversations`);
export const deleteConversation = (conversationId) =>
  API.patch(`/messages/deleteConversation/${conversationId}`);
export const deleteConversationFromDb = (id) =>
  API.delete(`/messages/deleteConversation/${id}`);
export const deleteMessages = (id, receiver) =>
  API.patch(`/messages/deleteMessages/${id}`, { receiver });
export const deleteMessagesFromDb = (id) =>
  API.delete(`/messages/deleteMessages/${id}`);
export const sendMessage = (message) =>
  API.post(`/messages/sendMessage`, message);

// Auth
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
