import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { getPosts } from "../actions/posts";


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

export default useInfinityScroll;
