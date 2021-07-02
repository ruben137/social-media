import {
  CREATE,
  FETCH_ALL,
  DELETE,
  FETCH_MORE,
  NO_DATA,
} from "../constants/actionTypes";

const initialState = {
  posts: [],
  noMore:false
};

export const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return { ...state,
          posts: [...state.posts, ...action.payload],
        };
    case FETCH_MORE:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      };
    case CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case NO_DATA:
      return{
        ...state,
        noMore:action.payload
      }

    default:
      return state;
  }
};
