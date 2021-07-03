import {
  Avatar,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/posts";

import { useStyles } from "./styles";
import { useHistory, useParams } from "react-router";
import UserInfo from "./UserInfo/UserInfo";
import PictureModal from "./PictureModal/PictureModal";
import { useInfinityScrollProfile } from "../../customHooks/useInfinityScroll";
import { clearUserProfileState } from "../../actions/userProfile";


const UserProfile = () => {
  const params = useParams();
  const history = useHistory();
  const logUser = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const dispatch = useDispatch();
  const loader = useRef()
  const user = useSelector((state) => state.user);
  const [skip, setSkip] = useState(0);
  const { userPosts } = useInfinityScrollProfile(skip, params.id, dispatch)

  useEffect(() => {
    if (!logUser) {
      history.push("/auth");
    }
  }, [history, logUser]);



  const { error } = user;



  useEffect(() => {
    dispatch(getUser(params?.id));
    return () => {
      dispatch(clearUserProfileState())
      setSkip(0)
    }
  }, [dispatch, params?.id]);



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

  const { username } = userPosts;

  return (
    <>
      {!error ? (
        <Container>
          <Card style={{ marginTop: "20px" }}>
            <CardContent>
              <Container className={classes.profile}>
                <Avatar
                  src={user.profilePic}
                  className={classes.image}
                  alt={user?.userName}
                >
                  <span style={{ fontSize: 50 }}>
                    {params.id.charAt(0).toUpperCase()}
                  </span>
                </Avatar>

                <UserInfo />
              </Container>
            </CardContent>

            <Grid
              container
              justifycontent="flex-start"
              spacing={1}
              style={{ margin: "20px auto" }}
              cols={3}
            >
              {!username &&
                userPosts?.map((img, i) => (
                  <Grid
                    key={i}
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    style={{ padding: 20, height: 250 }}
                    onClick={() => { }}
                  >
                    <PictureModal
                      img={img}
                      userPosts={userPosts}
                      currentIndex={i}
                    />
                  </Grid>
                ))}
            </Grid>
          </Card>
          <div style={{ display: userPosts.length ? "block" : "none" }} ref={loader} />
        </Container>
      ) : (
        <Container>
          <Card className={classes.card}>
            <Typography>{error}</Typography>
          </Card>
        </Container>
      )}
    </>
  );
};

export default UserProfile;
