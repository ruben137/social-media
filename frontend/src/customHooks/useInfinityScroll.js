import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { getPosts } from "../actions/posts";
import { getUserPosts } from "../actions/userProfile";


function useInfinityScroll(page, dispatch) {
  const postsState = useSelector((state) => state.postsState);
  const {posts,noMore}=postsState
  const sendQuery = useCallback(() => {
    if(!noMore)dispatch(getPosts(page));
  }, [dispatch, page,noMore]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { posts ,noMore};
}

export const useInfinityScrollProfile = (page, user, dispatch) => {
  const { userPosts ,noMore} = useSelector((state) => state.userPosts);
  const sendQuery = useCallback(() => {

    if(!noMore)dispatch(getUserPosts(user, page));
  }, [dispatch, page, user,noMore]);

  useEffect(() => {
    sendQuery();
 
  }, [dispatch,sendQuery, page,user]);

  return { userPosts };
};

export default useInfinityScroll;
