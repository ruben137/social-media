import React, { useState } from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  deleteNotification,
  newNotification,
} from "../../../actions/navigation";
import socket from "../../Messages/SocketProvider";
import Likes from "../Likes";
import ProfileComment from "../ProfileComment/ProfileComment";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import moment from "moment";

import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { useStyles } from "../styles";
import {
  getUserPost,
  dislikePost,
  likePost,
  commentPost,
} from "../../../actions/userProfile";

export default function PictureModal({ img, userPosts, currentIndex }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const userPostState = useSelector((state) => state.userPosts);
  const { comments, likes } = userPostState.userPost;

  const [index, setIndex] = useState(null);
  const dispatch = useDispatch();
  const handleClose = async () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
    setIndex(currentIndex);
    dispatch(getUserPost(userPosts[currentIndex]._id));
  };

  const logUser = JSON.parse(localStorage.getItem("profile"));

  const [commentData, setCommentData] = useState("");

  const handleComment = async (e) => {
    e.preventDefault();
    if (commentData.trim() === "") return;
    dispatch(
      commentPost({
        comment: commentData,
        from: logUser.result.userName,
        commentId: userPosts[index]._id,
      })
    );

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
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          cursor: "pointer",
        }}
        alt={img.description}
        src={img.url}
        onClick={handleOpen}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
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
                  overflowY: comments?.length >= 1 ? "scroll" : "unset",
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
                    {moment(userPosts[index]?.createdAt).fromNow()}
                  </span>
                </Typography>

                <Button
                  fontSize="medium"
                  style={{ cursor: "pointer" }}
                  color="secondary"
                  onClick={async () => {
                    if (
                      likes.some(
                        (like) => like.from === logUser.result.userName
                      )
                    ) {
                      const currentLike = likes.find(
                        (like) => like.from === logUser.result.userName
                      );
                      dispatch(dislikePost(currentLike._id));

                      if (userPosts[index].name !== logUser.result.userName) {
                        await dispatch(
                          deleteNotification(
                            userPosts[index]?._id,
                            logUser.result.userName,
                            "like"
                          )
                        );
                      }
                    } else {
                      dispatch(
                        likePost({
                          from: logUser.result.userName,
                          likeId: userPosts[index]?._id,
                        })
                      );
                      if (userPosts[index].name !== logUser.result.userName) {
                        await dispatch(
                          newNotification({
                            notificationId: userPosts[index]?._id,
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
                    onChange={(e) => setCommentData(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.code === "Enter") handleComment(e);
                    }}
                  />
                  <Button variant="contained" type="submit">
                    Post
                  </Button>
                </form>
                <div style={{ position: "relative" }}>
                  {comments.map((comment) => (
                    <ProfileComment
                      comment={comment}
                      setOpen={setOpen}
                      setIndex={setIndex}
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

                dispatch(getUserPost(userPosts[index - 1]._id));
              }}
            >
              <ChevronLeftIcon style={{ fontSize: 40 }} />
            </IconButton>

            <IconButton
              disabled={index === userPosts.length - 1}
              style={{ position: "absolute", right: 0 }}
              onClick={() => {
                setIndex(index + 1);
                dispatch(getUserPost(userPosts[index + 1]._id));
              }}
            >
              <ChevronRightIcon style={{ fontSize: 40 }} />
            </IconButton>
          </>
        </Fade>
      </Modal>
    </>
  );
}
