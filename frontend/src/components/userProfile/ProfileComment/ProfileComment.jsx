import { Avatar, Button, Menu, MenuItem, Typography } from "@material-ui/core";
import React, { useState } from "react";
import socket from "../../Messages/SocketProvider";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment, likeComment } from "../../../actions/userProfile";

const ProfileComment = ({
  comment,
  user,
  deleteNotification,
  index,
  userPosts,
  newNotification,
  logUser,
  setCommentData,
  setIndex,
  setOpen,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const [commentId, setCommentId] = useState("");
  const dispatch = useDispatch();
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLikeComment = async () => {
    dispatch(likeComment(comment._id));

    if (comment.from === user?.result?.userName) return;

    if (comment.likes.includes(user?.result?.userName)) {
      await dispatch(
        deleteNotification({
          _id: userPosts[index]._id,
          from: logUser?.result?.userName,
          type: "likeComment",
        })
      );
    } else {
      console.log(comment.from);
      await dispatch(
        newNotification({
          notificationId: userPosts[index]._id,
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
  };
  const deleteCurrentComment = async () => {
    setAnchorEl(null);
    dispatch(deleteComment(commentId));

    setCommentData("");
    dispatch(
      deleteNotification({
        _id: userPosts[index]._id,
        from: logUser?.result?.userName,
        type: "comment",
      })
    );
    socket.emit("send-notification", {
      notification: "new comment",
      receiver: userPosts[index].name,
    });
  };
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={deleteCurrentComment}>Delete comment</MenuItem>
    </Menu>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: 8,
        flexWrap: "wrap",
        overFlowY: "scroll",
      }}
    >
      <Avatar src={comment.profilePic} />

      <Typography
        component={Link}
        to={`/profile/${comment.from}`}
        onClick={() => {
          setOpen(false);
          setIndex(null);
        }}
        style={{
          fontWeight: 700,
          marginLeft: 5,
          textDecoration: "none",
          color: "#182C61",
        }}
      >
        {comment.from}
      </Typography>
      <span
        style={{
          marginLeft: 5,
          color: "#9e9e9e",
          width: "100%",
        }}
      >
        {moment(comment.createdAt).fromNow()}
      </span>
      <Typography style={{ marginLeft: 5 }}>{comment.comment}</Typography>

      <div
        style={{
          width: "100%",
          border: "1px solid #f1f2f6",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button style={{ position: "relative" }} onClick={handleLikeComment}>
          {comment.likes.find((user) => user === logUser?.result?.userName) ? (
            <>
              <FavoriteIcon fontSize="small" color="secondary" />
              <span
                style={{
                  position: "absolute",
                  right: 3,
                  fontSize: "15px",
                }}
              >
                {comment?.likes?.length}
              </span>
            </>
          ) : (
            <>
              <FavoriteBorderIcon fontSize="small" color="secondary" />
              <span
                style={{
                  position: "absolute",
                  right: 13,
                }}
              >
                {comment?.likes?.length > 0 && comment?.likes?.length}
              </span>
            </>
          )}
        </Button>
        <Button
          onClick={(e) => {
            handleMenuOpen(e);
            setCommentId(comment._id);
          }}
        >
          <MoreVertIcon />
        </Button>
      </div>
      {renderMenu}
    </div>
  );
};

export default ProfileComment;
