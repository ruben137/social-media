import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  TextField,
  Paper,
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUser, getUsers } from "../../actions/posts";

import { updateDescription, getUserPosts } from "../../actions/userProfile";

import { deleteNotification, newNotification } from "../../actions/navigation";
import { useStyles } from "./styles";
import { useHistory, useParams } from "react-router";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import moment from "moment";
import FollowButton from "./FollowButton";
import Likes from "./Likes";
import socket from "../Messages/SocketProvider";

import * as api from "../../api/index";
import ProfileComment from "./ProfileComment/ProfileComment";

const UserProfile = () => {
  const params = useParams();
  const history = useHistory();
  const logUser = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!logUser) {
      history.push("/auth");
    }
  }, [history, logUser]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { error, loading } = user;

  const [followersMenu, setFollowersMenu] = useState(false);
  const [followingMenu, setFollowingMenu] = useState(false);
  const [likes, setLikes] = useState([]);
  const [following, setFollowing] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);

  const [file, setFile] = useState();
  const userPosts = useSelector((state) => state.userPosts);

  const [commentData, setCommentData] = useState("");

  const [descriptionData, setDescriptionData] = useState({
    description: "",
  });
  const [index, setIndex] = useState(null);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFollowersMenu(false);
    setFollowingMenu(false);
    setShowImage(false);
  };

  useEffect(() => {
    dispatch(getUser(params?.id));
  }, [dispatch, params?.id]);

  useEffect(() => {
    const getPosts = async () => {
      await dispatch(getUserPosts(params?.id));
    };
    getPosts();
  }, [dispatch, params?.id]);

  const clear = () => {
    setDescriptionData({ description: "" });
  };
  const getLikes = async (id) => {
    try {
      const { data } = await api.getLikes(id);
      setLikes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async (id) => {
    try {
      const { data } = await api.likePost(id);
      setLikes([...likes, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const dislikePost = async (id) => {
    try {
      const { data } = await api.dislikePost(id);
      setLikes(likes.filter((like) => like._id !== data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", logUser?.result?.userName);
      await api.updateProfilePic(formData);
    }

    await dispatch(
      updateDescription(logUser?.result?._id, { ...descriptionData })
    );
    handleClose();
    clear();
  };
  const { username } = userPosts;

  const followers = users.filter((follower) =>
    user?.followers?.includes(follower.userName)
  );

  const userFollows = users.filter((following) =>
    user?.following?.includes(following.userName)
  );

  const handleComment = async (e) => {
    e.preventDefault();
    if (commentData.trim() === "") return;
    try {
      const { data } = await api.commentPost({
        comment: commentData,
        from: logUser.result.userName,
        commentId: userPosts[index]._id,
      });
      setComments([...comments, data]);
    } catch (error) {
      console.log(error);
    }
    setCommentData("");
    if (logUser.result.userName === userPosts[index].name) return;
    await dispatch(
      newNotification({
        notificationId: userPosts[index]._id,
        type: "comment",
        from: logUser.result.userName,
        to: userPosts[index].name,
        notification: `${logUser.result.userName} commented your post`,
      })
    );
    socket.emit("send-notification", {
      notification: "new comment",
      receiver: userPosts[index].name,
    });
  };

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

                <Container className={classes.descriptionContainer}>
                  <div className={classes.description}>
                    <div style={{ width: "100%" }}>
                      <Typography
                        style={{
                          fontWeight: 700,
                          flewGrow: 1,
                          textAlign: "center",
                        }}
                      >
                        {logUser?.result?.userName === params?.id
                          ? logUser?.result?.userName
                          : params?.id}
                      </Typography>
                    </div>
                    <div>
                      <p align="center" style={{ fontWeight: 700 }}>
                        {userPosts?.length ? userPosts?.length : 0}
                        <br /> <span style={{ fontWeight: 300 }}>posts</span>
                      </p>
                    </div>
                    <div>
                      <p
                        align="center"
                        style={{ fontWeight: 700, cursor: "pointer" }}
                        onClick={() => setFollowersMenu(true)}
                      >
                        {user?.followers?.length}
                        <br />{" "}
                        <span style={{ fontWeight: 300 }}>followers</span>
                      </p>
                    </div>
                    <div>
                      <p
                        align="center"
                        style={{ fontWeight: 700, cursor: "pointer" }}
                        onClick={() => setFollowingMenu(true)}
                      >
                        {user?.following?.length}
                        {loading && following}
                        <br />{" "}
                        <span style={{ fontWeight: 300 }}>following</span>{" "}
                      </p>
                    </div>
                    {params?.id === logUser?.result.userName ? (
                      <Button
                        style={{
                          fontWeight: 700,
                          backgroundColor: "#dcdde1",
                          width: "100%",
                        }}
                        variant="contained"
                        type="button"
                        onClick={handleOpen}
                      >
                        Edit profile
                      </Button>
                    ) : (
                      <FollowButton
                        user={user}
                        setFollowing={setFollowing}
                        logUser={logUser}
                      />
                    )}

                    <div>
                      <Typography
                        variant="body2"
                        style={{
                          fontSize: 18,
                          marginTop: "10px",
                          width: "100%",
                        }}
                      >
                        Description
                      </Typography>

                      <Typography style={{ width: "100%" }}>
                        {user?.description}
                      </Typography>
                    </div>
                  </div>
                </Container>
                <div>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open || followersMenu || followingMenu || showImage}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    {open ? (
                      <Fade in={open}>
                        <div className={classes.paper}>
                          <Typography align="center">User settings</Typography>
                          <form
                            id="userProfile"
                            onSubmit={handleSubmit}
                            className={classes.form}
                          >
                            <TextField
                              type="text"
                              name="description"
                              fullWidth
                              label="User description"
                              value={descriptionData.description}
                              onChange={(e) =>
                                setDescriptionData({
                                  ...descriptionData,
                                  description: e.target.value,
                                })
                              }
                              style={{
                                fontSize: "1rem",
                                border: "none",
                                outline: "none",
                                margin: 0,
                              }}
                            />
                            <Typography
                              variant="body2"
                              style={{ margin: "5px 0" }}
                            >
                              Profile picture
                            </Typography>
                            <input type="file" onChange={handleChange} />
                            <br />

                            <Button
                              variant="contained"
                              type="submit"
                              style={{
                                backgroundColor: "#4cd137",
                                color: "#fff",
                                padding: 0,
                                marginTop: "5px",
                              }}
                            >
                              Done
                            </Button>
                          </form>
                        </div>
                      </Fade>
                    ) : (
                      <>
                        {followersMenu && (
                          <Fade in={followersMenu}>
                            <Paper
                              className={classes.followers}
                              style={{
                                overflowY:
                                  followers.length >= 7 ? "scroll" : "unset",
                              }}
                            >
                              <Typography
                                style={{ fontWeight: 700 }}
                                align="center"
                              >
                                Followers
                              </Typography>
                              <ul style={{ margin: 0, padding: 10 }}>
                                {followers.map((follower, i) => (
                                  <li className={classes.li} key={i}>
                                    <div>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography
                                          style={{
                                            display: "inline-block",
                                            cursor: "pointer",
                                            textDecoration: "none",
                                            color: "black",
                                          }}
                                          variant="body2"
                                          component={Link}
                                          to={`/profile/${follower.userName}`}
                                          onClick={handleClose}
                                        >
                                          {follower.userName}
                                        </Typography>
                                        <Avatar src={follower.profilePic} />
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </Paper>
                          </Fade>
                        )}

                        {followingMenu && (
                          <Fade in={followingMenu}>
                            <Paper className={classes.followers}>
                              <Typography
                                style={{ fontWeight: 700 }}
                                align="center"
                              >
                                Following
                              </Typography>
                              <ul
                                style={{
                                  margin: 0,
                                  padding: 10,
                                  overflowY:
                                    followers.length >= 7 ? "scroll" : "unset",
                                }}
                              >
                                {userFollows.map((follower, i) => (
                                  <li className={classes.li} key={i}>
                                    <div>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography
                                          style={{
                                            display: "inline-block",
                                            cursor: "pointer",
                                            textDecoration: "none",
                                            color: "black",
                                          }}
                                          variant="body2"
                                          component={Link}
                                          to={`/profile/${follower.userName}`}
                                          onClick={handleClose}
                                        >
                                          {follower.userName}
                                        </Typography>
                                        <Avatar src={follower.profilePic} />
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </Paper>
                          </Fade>
                        )}

                        {showImage && (
                          <>
                            <div className={classes.imageContainer}>
                              <img
                                className={classes.postImage}
                                src={userPosts[index]?.url}
                                alt=""
                              />
                              <div
                                className={classes.commentContainer}
                                style={{
                                  overflowY:
                                    comments?.length >= 1 ? "scroll" : "unset",
                                }}
                              >
                                <Typography
                                  style={{
                                    color: "black",
                                    fontWeight: 700,
                                    margin: 8,
                                  }}
                                >
                                  {userPosts[index]?.name} <br />
                                  <span style={{ fontWeight: "300" }}>
                                    {userPosts[index]?.message
                                      ? userPosts[index]?.message
                                      : "No description"}
                                  </span>
                                  <br />
                                  <span>
                                    {userPosts[index]?.tags
                                      ? userPosts[index]?.tags
                                      : "No tags"}
                                  </span>
                                  <span
                                    style={{
                                      fontWeight: "300",
                                      color: "#9e9e9e",
                                    }}
                                  >
                                    {" "}
                                    {moment(
                                      userPosts[index]?.createdAt
                                    ).fromNow()}
                                  </span>
                                </Typography>

                                <Button
                                  fontSize="medium"
                                  style={{ cursor: "pointer" }}
                                  color="secondary"
                                  onClick={async () => {
                                    if (
                                      likes.some(
                                        (like) =>
                                          like.from === logUser.result.userName
                                      )
                                    ) {
                                      const currentLike = likes.find(
                                        (like) =>
                                          like.from === logUser.result.userName
                                      );
                                      dislikePost(currentLike._id);
                                      if (
                                        userPosts[index].name !==
                                        logUser.result.userName
                                      ) {
                                        await dispatch(
                                          deleteNotification(
                                            userPosts[index]?._id,
                                            logUser.result.userName,
                                            "like"
                                          )
                                        );
                                      }
                                    } else {
                                      likePost({
                                        from: logUser.result.userName,
                                        likeId: userPosts[index]?._id,
                                      });
                                      if (
                                        userPosts[index].name !==
                                        logUser.result.userName
                                      ) {
                                        await dispatch(
                                          newNotification({
                                            notificationId:
                                              userPosts[index]?._id,
                                            type: "like",
                                            from: logUser.result.userName,
                                            to: userPosts[index]?.name,
                                            notification: `${logUser.result.userName} liked your post`,
                                          })
                                        );
                                      }
                                    }

                                    socket.emit("send-notification", {
                                      notification: "new like",
                                      receiver: userPosts[index]?.name,
                                    });
                                  }}
                                >
                                  <Likes likes={likes} logUser={logUser} />
                                </Button>
                                <form
                                  style={{
                                    display: "flex",
                                    marginBottom: 5,
                                    padding: 8,

                                    bottom: 0,
                                    width: "100%",
                                  }}
                                  onSubmit={handleComment}
                                >
                                  <textarea
                                    type="text"
                                    placeholder="Add a comment!"
                                    name="comment"
                                    className={classes.commentInput}
                                    value={commentData}
                                    onChange={(e) =>
                                      setCommentData(e.target.value)
                                    }
                                    onKeyPress={(e) => {
                                      if (e.code === "Enter") handleComment(e);
                                    }}
                                  />
                                  <Button variant="contained" type="submit">
                                    Post
                                  </Button>
                                </form>
                                <div style={{ position: "relative" }}>
                                  {comments.map((comment, i) => (
                                    <ProfileComment
                                      comment={comment}
                                      setShowImage={setShowImage}
                                      setIndex={setIndex}
                                      setComments={setComments}
                                      comments={comments}
                                      user={logUser}
                                      deleteNotification={deleteNotification}
                                      index={index}
                                      userPosts={userPosts}
                                      newNotification={newNotification}
                                      logUser={logUser}
                                      setCommentData={setCommentData}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>

                            <IconButton
                              disabled={index === 0}
                              style={{ position: "absolute", left: 0 }}
                              onClick={() => {
                                setIndex(index - 1);

                                getLikes(userPosts[index]._id);
                              }}
                            >
                              <ChevronLeftIcon style={{ fontSize: 40 }} />
                            </IconButton>

                            <IconButton
                              disabled={index === userPosts.length - 1}
                              style={{ position: "absolute", right: 0 }}
                              onClick={() => {
                                setIndex(index + 1);
                                getLikes(userPosts[index]._id);
                              }}
                            >
                              <ChevronRightIcon style={{ fontSize: 40 }} />
                            </IconButton>
                          </>
                        )}
                      </>
                    )}
                  </Modal>
                </div>
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
                    onClick={() => {
                      setShowImage(true);
                      setIndex(i);
                      const getComments = async () => {
                        try {
                          const { data } = await api.getComments(
                            userPosts[i]._id
                          );
                          setComments(data);
                        } catch (error) {
                          console.log(error);
                        }
                      };
                      getComments();
                      getLikes(userPosts[i]._id);
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      alt={img.description}
                      src={img.url}
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
