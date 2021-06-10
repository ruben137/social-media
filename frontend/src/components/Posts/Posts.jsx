import React, { useEffect, useState, useCallback, useRef } from "react";
import Form from "./Form/Form";
import Post from "./Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, Typography } from "@material-ui/core";
import LoadingPost from "./Post/LoadingPost";
import { getMorePosts, getPosts, getUser } from "../../actions/posts";
import { useStyles } from "./styles";
import { useHistory } from "react-router";

const Posts = () => {
  const dispatch = useDispatch();
  const logUser = JSON.parse(localStorage.getItem("profile"));
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state?.user);
  const loader = useRef(null);
  const classes = useStyles();
  const history = useHistory();

  const [prevent, setPrevent] = useState(false);
  const [skip, setSkip] = useState(0);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    if (!logUser) {
      history.push("/auth");
      setPrevent(false);
    }
  }, [history, logUser]);

  useEffect(() => {
    dispatch(getUser(logUser?.result?.userName));
  }, [dispatch, logUser?.result?.userName]);

  const getMore = useCallback(
    (amount) => {
      dispatch(getMorePosts(amount));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getPosts(0));
  }, [dispatch]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {

      setSkip((prev) => prev + 5);
    }
  }, []);

  useEffect(() => {
    if (posts.includes("no-posts")) setPrevent(true);
  }, [posts]);

  useEffect(() => {
    if (skip === 0) return;
    if (prevent) return;
    getMore(skip);
  }, [skip, prevent, getMore]);

  useEffect(() => {
    

    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  const filterPosts = posts?.filter(
    (post) =>
      user?.following?.some((u) => u === post.name) ||
      post.name === logUser?.result?.userName
  );

  return (
    <>
      {logUser?.result ? (
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      ) : null}

      {!posts.length ? <LoadingPost user={user} /> : <span></span>}
      <div className={classes.postsContainer}>
        {filterPosts.map((post, i) => (
          <Post
            key={i}
            post={post}
            setCurrentId={setCurrentId}
            currentId={currentId}
          />
        ))}
        <div style={{display:posts.length?'block':'none'}} ref={loader} />
        {prevent ? (
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
