import {
  CREATE,
  FETCH_ALL,
  DELETE,
  FETCH_MORE,
  NO_DATA,
DELETE_COMMENT,
  GET_COMMENTS,
  COMMENT_POST,
  LIKE_COMMENT,
  GET_LIKES,
  LIKE_POST,
  DISLIKE_POST
} from "../constants/actionTypes";

const initialState = {
  posts: [],
  noMore:false,
  tryna:false
};

export const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return { ...state, posts: [...state.posts, ...action.payload] };
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
      return {
        ...state,
        noMore: action.payload,
      };
    case GET_LIKES:
      return{
        ...state,
        posts:state.posts.map((post)=>
        post._id===action.id?{...post,likes:action.payload}:post)
      }
    case LIKE_POST:
      return{
        ...state,
        posts:state.posts.map((post)=>
        post._id===action.id?{...post,likes:[...post.likes,action.payload]}:post)
      }
    case DISLIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.id
            ? {
                ...post,
                likes: post.likes.filter((like) => like._id !== action.payload),
              }
            : post
        ),
      };

    case GET_COMMENTS: {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.id ? { ...post, comments: action.payload } : post
        ),
      };
    }
    case COMMENT_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.id
            ? { ...post, comments: [...post.comments, action.payload] }
            : post
        ),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.id
            ? {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment._id !== action.payload
                ),
              }
            : post
        ),
      };

    case LIKE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.id
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment._id === action.payload._id ? action.payload : comment
                ),
              }
            : post
        ),
      };

    default:
      return state;
  }
};
