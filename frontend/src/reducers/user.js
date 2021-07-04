import {
  GET_USER,
  UPDATE_DESCRIPTION,
  USER_NOT_FOUND,
  FOLLOW,
  FOLLOW_REQUEST,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  NO_FOLLOWERS_DATA,
  CLEAN_FOLLOWER_STATE,
  CLEAN_USER_PROFILE_STATE,
} from "../constants/actionTypes";

const initialState = {
  user: {},
  loading: false,
  error: null,
  following: [],
  followers: [],
  noMore: false,
 
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    case UPDATE_DESCRIPTION:
      return {
        ...state,
        user: { ...state.user, description: action.payload },
      };
    case USER_NOT_FOUND:
      return { ...state, error: action.payload };
    case FOLLOW_REQUEST:
      return { ...state, loading: true };
    case FOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          followers: action.payload.followers,
        },
      };
    case GET_FOLLOWERS:
      return {
        ...state,
        followers: [...state.followers, ...action.payload],
      };
    case NO_FOLLOWERS_DATA:
      return {
        ...state,
        noMore: true,
      };
    case CLEAN_FOLLOWER_STATE:
      return {
        ...state,
        followers: [],
        following:[],
        noMore: false,
      };
    case CLEAN_USER_PROFILE_STATE:
      return (state = initialState);
    case GET_FOLLOWING:
      return {
        ...state,
        following: action.payload,
      };
    default:
      return state;
  }
};
