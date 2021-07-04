import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { getPosts } from "../actions/posts";
import { getFollowers, getUserPosts,getFollowing } from "../actions/userProfile";


function useInfinityScroll(page, dispatch) {
  const postsState = useSelector((state) => state.postsState);
  const { posts, noMore, loading } = postsState;
  const sendQuery = useCallback(() => {
    if (!noMore) dispatch(getPosts(page));
  }, [dispatch, page, noMore]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { posts, noMore, loading };
}

export const useInfinityScrollProfile = (page, user, dispatch) => {
  const { userPosts, noMore } = useSelector((state) => state.userPosts);
  const sendQuery = useCallback(() => {
    if (!noMore) dispatch(getUserPosts(user, page));
  }, [dispatch, page, user, noMore]);

  useEffect(() => {
    sendQuery();
  }, [dispatch, sendQuery, page, user]);

  return { userPosts };
};

export const useInfinityScrollFollowers = (page, user, dispatch,open) => {
  const { followers, noMore } = useSelector((state) => state.userState);


  const sendQuery = useCallback(() => {
    if (!noMore && user &&open) {

      dispatch(getFollowers(user, page));}
  }, [dispatch, page, noMore,user,open]);

  useEffect(() => {

    sendQuery();
  }, [dispatch, sendQuery, page,open]);

  return { followers };
};
export const useInfinityScrollFollowing = (page, user, dispatch,open) => {
  const { following, noMore } = useSelector((state) => state.userState);

  const sendQuery = useCallback(() => {
    if (!noMore && user&&open) dispatch(getFollowing(user, page));
  }, [dispatch, page, noMore, user,open]);

  useEffect(() => {
    sendQuery();
  }, [dispatch, sendQuery, page,open]);

  return { following };
};



export default useInfinityScroll;
