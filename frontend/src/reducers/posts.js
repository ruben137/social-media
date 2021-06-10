import {
  CREATE,
  FETCH_ALL,
  DELETE,
  UPDATE,
  LIKE,
  FETCH_MORE,
  NO_DATA

} from "../constants/actionTypes";

export const posts=(posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case NO_DATA:
      return [...posts, action.payload]
    case FETCH_MORE:
    return [...posts, ...action.payload];

    case CREATE:
      return [action.payload,...posts];
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      default:
        return posts;
    }
  };
 





