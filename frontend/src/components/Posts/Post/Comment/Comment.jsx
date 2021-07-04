import { Avatar, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "../styles";
import moment from "moment";
import * as api from "../../../../api/index";
import { useDispatch } from "react-redux";
import socket from "../../../Messages/SocketProvider";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import { likeComment } from "../../../../actions/posts";

const Comment = ({
  comment,
  setCommentMode,
  user,
  deleteNotification,
  post,
  newNotification,
  setCommentId,
  handleProfileMenuOpen,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const getProfilePic = async () => {
      try {
        const { data } = await api.getProfilePic(comment.from);
        setProfilePic(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfilePic();
  }, [comment.from]);

  return (
    <div className={classes.flexContainer}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar src={profilePic} />
        <div className={classes.nameContainer}>
          <Typography
            component={Link}
            to={`/profile/${comment.from}`}
            className={classes.span}
          >
            {comment.from}
          </Typography>
          <span className={classes.date}>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
      </div>

      <div className={classes.commentContainer}>
        <Typography variant="body2" className={classes.comment}>
          {comment.comment}
        </Typography>
        <div className={classes.likeButtonContainer}>
          <Button
            style={{ border: "1px solid #f1f2f6" }}
            onClick={async () => {
              dispatch(
                likeComment({ commentId: comment._id, postId: post._id })
              );

              if (comment.from === user?.result?.userName) return;
              if (comment.likes.includes(user?.result?.userName)) {
                await dispatch(
                  deleteNotification(
                   { _id:post._id,
                    from:user?.result?.userName,
                    type:"likeComment"}
                  )
                );
              } else {
                await dispatch(
                  newNotification({
                    notificationId: post._id,
                    type: "likeComment",
                    from: user?.result?.userName,
                    to: comment.from,
                    notification: `${user?.result?.userName} liked your comment`,
                  })
                );
              }

              socket.emit("send-notification", {
                notification: "new like",
                receiver: comment.from,
              });
            }}
          >
            {comment.likes.find((name) => name === user?.result?.userName) ? (
              <>
                <FavoriteIcon fontSize="small" color="secondary" />
                <span style={{ position: "absolute", right: 13 }}>
                  {comment?.likes?.length}
                </span>
              </>
            ) : (
              <>
                <FavoriteBorderIcon fontSize="small" color="secondary" />
                <span style={{ position: "absolute", right: 13 }}>
                  {comment?.likes?.length > 0 && comment?.likes?.length}
                </span>
              </>
            )}
          </Button>
          {comment.from === user?.result?.userName && (
            <Button
              disabled={post.deleting}
              onClick={(e) => {
                setCommentMode(true);
                setCommentId(comment._id);
                handleProfileMenuOpen(e);
              }}
            >
              <MoreVertIcon />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
