import {
  COMMENT_USER_POST,
  DELETE_USER_PROFILE_COMMENT,
  DISLIKE_USER_POST,
  FETCH_USER_POST,
  LIKE_USER_POST,
   LIKE_USER_PROFILE_COMMENT,
} from "../constants/actionTypes";
import { GET_USER_POST } from "../constants/actionTypes";

const initialState = {
  userPosts: [],
  userPost: {
    likes: [],
    comments: [],
  },
};
export const userPosts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_POST:
      return {
        ...state,
        userPosts: action.payload,
      };
    case GET_USER_POST:
      return {
        ...state,
        userPost: action.payload,
      };
    case LIKE_USER_POST:
      return {
        ...state,
        userPost: {
          ...state.userPost,
          likes: [...state.userPost.likes, action.payload],
        },
      };
    case DISLIKE_USER_POST:
      return {
        ...state,
        userPost: {
          ...state.userPost,
          likes: state.userPost.likes.filter(
            (like) => like._id !== action.payload
          ),
        },
      };
    case COMMENT_USER_POST:
      return {
        ...state,
        userPost: {
          ...state.userPost,
          comments: [action.payload,...state.userPost.comments],
        },
      };
    case DELETE_USER_PROFILE_COMMENT:
      return{
        ...state,
        userPost:{
          ...state.userPost,
          comments:state.userPost.comments.filter(comment => comment._id !== action.payload)
        }
      }
    case LIKE_USER_PROFILE_COMMENT:
      return {
        ...state,
        userPost: {
          ...state.userPost,
          comments: state.userPost.comments.map(comment =>
            comment._id === action.payload._id ? action.payload : comment
          ),
        },
      };
       
    default:
      return state;
  }
};
