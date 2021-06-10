import { FETCH_USER_POST} from "../constants/actionTypes";

export const userPosts = (userPosts = [], action) => {
  switch (action.type) {
    case FETCH_USER_POST:
      return action.payload;
      default:
        return userPosts;
    }
  };

  
  


     