import * as api from "../api/index.js";
import { FETCH_USER_POST, FOLLOW, FOLLOW_REQUEST, UPDATE_DESCRIPTION ,GET_USER_POST,LIKE_USER_POST,DISLIKE_USER_POST,COMMENT_USER_POST, DELETE_USER_PROFILE_COMMENT, LIKE, LIKE_USER_PROFILE_COMMENT, NO_DATA} from "../constants/actionTypes";

export const follow = (id) => async (dispatch) => {
  dispatch({ type: FOLLOW_REQUEST, payload: { id } });
  try {
    const { data } = await api.follow(id);
    dispatch({ type: FOLLOW, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateDescription = (id, newDescription) => async (dispatch) => {
  try {
    const { data } = await api.updateDescription(id, newDescription);

    dispatch({ type: UPDATE_DESCRIPTION, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPosts = (user,skip) => async (dispatch) => {
  try {
    const { data } = await api.getUserPosts(user,skip);
    if(!data.length){
      dispatch({type:NO_DATA})
    }else
    dispatch({ type: FETCH_USER_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const getUserPost = (id) => async (dispatch) => {
  try {
    const comments = await api.getComments(id);
    const likes = await api.getLikes(id);
    dispatch({
      type: GET_USER_POST,
      payload: { comments: comments.data, likes: likes.data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost=(id)=>async(dispatch)=>{
  try {
        const { data } = await api.likePost(id);
        dispatch({type:LIKE_USER_POST,payload:data})
  } catch (error) {
    console.log(error);
  }
}

 export const dislikePost =(id)=> async (dispatch) => {
    try {
      const { data } = await api.dislikePost(id);
      dispatch({type:DISLIKE_USER_POST,payload:data})
  
    } catch (error) {
      console.log(error);
    }
  };

  export const commentPost =
    ({ comment, from, commentId }) =>
    async (dispatch) => {
      try {
        const { data } = await api.commentPost({
          comment,
          from,
          commentId,
        });
        dispatch({ type: COMMENT_USER_POST, payload: data });
      } catch (error) {
        console.log(error);
      }
    };

 export const deleteComment=(id)=>async(dispatch)=>{
   try {
      const { data } = await api.deleteComment(id);
      dispatch({type:DELETE_USER_PROFILE_COMMENT,payload:data})
   } catch (error) {
      console.log(error);
   }
 }

 export const likeComment=(id)=>async(dispatch)=>{
   try {
     const {data}=await api.likeComment(id);
     dispatch({type:LIKE_USER_PROFILE_COMMENT,payload:data})
   } catch (error) {
       console.log(error);
   }
 }


