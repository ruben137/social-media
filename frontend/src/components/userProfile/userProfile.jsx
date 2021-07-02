import {
  Avatar,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUser, getUsers } from "../../actions/posts";
import { getUserPosts } from "../../actions/userProfile";
import { useStyles } from "./styles";
import { useHistory, useParams } from "react-router";
import UserInfo from "./UserInfo/UserInfo";
import PictureModal from "./PictureModal/PictureModal";

const UserProfile = () => {
  const params = useParams();
  const history = useHistory();
  const logUser = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!logUser) {
      history.push("/auth");
    }
  }, [history, logUser]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { error } = user;

  const userPostsState = useSelector((state) => state.userPosts);
  const { userPosts } = userPostsState;

  useEffect(() => {
    dispatch(getUser(params?.id));
  }, [dispatch, params?.id]);

  useEffect(() => {
    dispatch(getUserPosts(params?.id));
  }, [dispatch, params?.id]);

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
                    onClick={() => {}}
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
