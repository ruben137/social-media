import React, { useEffect, useState, useCallback, useRef } from "react";
import Form from "./Form/Form";
import Post from "./Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, Typography } from "@material-ui/core";
import LoadingPost from "./Post/LoadingPost";
import { getUser, cleanPostState } from "../../actions/posts";
import { useStyles } from "./styles";
import { useHistory } from "react-router";
import useInfinityScroll from "../../customHooks/useInfinityScroll";
import NoPosts from "./Post/NoPosts/NoPosts";
import NoCurrentPosts from "./Post/NoPosts/NoCurrentPosts";

const Posts = () => {
  const dispatch = useDispatch();
  const logUser = JSON.parse(localStorage.getItem("profile"));
  const user = useSelector((state) => state?.user);
  const loader = useRef(null);
  const classes = useStyles();
  const history = useHistory();

  const [skip, setSkip] = useState(0);
  const [currentId, setCurrentId] = useState(0);
  const { posts, noMore, loading } = useInfinityScroll(skip, dispatch);

  useEffect(() => {
    if (!logUser) {
      history.push("/auth");
    }
  }, [history, logUser]);

  useEffect(() => {
    dispatch(getUser(logUser?.result?.userName));
    return () => {
      dispatch(cleanPostState());
      setSkip(0);
    };
  }, [dispatch, logUser?.result?.userName]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setSkip((prev) => prev + 5);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <>
      {logUser?.result ? (
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      ) : null}

      {loading && <LoadingPost user={user} />}
      {user?.following?.length < 1 && <NoPosts />}
      {!posts.length && !loading && <NoCurrentPosts />}
      <div className={classes.postsContainer}>
        {posts.map((post, i) => (
          <Post key={i} post={post} currentId={currentId} />
        ))}
        <div
          style={{ display: posts.length ? "block" : "none" }}
          ref={loader}
        />
        {noMore &&skip ? (
          <Card align="center" className={classes.noMore}>
            <CardContent>
              <Typography>There are no more posts to show</Typography>
            </CardContent>
          </Card>
        ) : (
          <span></span>
        )}
      </div>
    </>
  );
};

export default Posts;
