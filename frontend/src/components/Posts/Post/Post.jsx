import {
  Button,
  Paper,
  CardActions,
  CardMedia,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Collapse,
  Avatar,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useStyles } from "./styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {
  commentPost,
  deleteComment,
  deletePost,
  dislikePost,
  getComments,
  getLikes,
  likePost,
  updatePost,
} from "../../../actions/posts";
import {
  newNotification,
  deleteNotification,
} from "../../../actions/navigation";
import { useDispatch, useSelector } from "react-redux";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import socket from "../../Messages/SocketProvider";
import Comment from "./Comment/Comment";


const Post = ({ post }) => {
  const [currentId, setCurrentId] = useState(null);
  const currentPost = useSelector((state) =>
    currentId
      ? state.postsState.posts.find((post) => post._id === currentId)
      : null
  );
  const { comments } = useSelector((state) =>
    currentId
      ? state.postsState.posts.find((item) => item._id === currentId)
      : []
  );
  const { likes } = useSelector((state) =>
    state.postsState.posts.find((item) => item._id === post._id)
  );

  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const [commentMode, setCommentMode] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [edit, setEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [postData, setPostData] = useState({ message: "", tags: "" });
  const [commentData, setCommentData] = useState("");



  useEffect(() => {
    if (currentPost) setPostData(currentPost);
  }, [currentPost]);

  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const dispatch = useDispatch();

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCommentMode(false);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    dispatch(deletePost(post._id));
  };
  useEffect(() => {
    dispatch(getLikes(post._id));
  }, [dispatch, post._id]);

  const deleteCurrentComment = async () => {
    setAnchorEl(null);
    dispatch(deleteComment({ commentId, id: currentId }));
    setCommentData("");
    if (post.name !== user?.result?.userName) {
      await dispatch(
        deleteNotification(post._id, user?.result?.userName, "comment")
      );
      socket.emit("send-notification", {
        notification: "new comment",
        receiver: post.name,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updatePost(currentId, {
          ...postData,
        })
      );
      setCurrentId(0);
      setEdit(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (commentData.trim() === "") return;
    dispatch(
      commentPost({
        comment: commentData,
        from: user.result.userName,
        commentId: currentId,
        postId: currentId,
      })
    );

    setCommentData("");
    if (user.result.userName === post.name) return;
    await dispatch(
      newNotification({
        notificationId: post._id,
        type: "comment",
        from: user.result.userName,
        to: post.name,
        notification: `${user.result.userName} commented your post`,
      })
    );

    socket.emit("send-notification", {
      notification: "new comment",
      receiver: post.name,
    });
  };
  const handleCloseEdit = () => {
    setEdit(false);
  };

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
      <MenuItem onClick={!commentMode ? handleDelete : deleteCurrentComment}>
        Delete {!commentMode ? "post" : "comment"}
      </MenuItem>
      {!commentMode && (
        <MenuItem
          onClick={() => {
            setEdit(true);
            setCurrentId(post._id);
            setAnchorEl(null);
          }}
        >
          Edit post
        </MenuItem>
      )}
    </Menu>
  );

  const Likes = () => {
    if (likes?.length > 0) {
      return likes.find((item) => item.from === user?.result?.userName) ? (
        <>
          <FavoriteIcon fontSize="small" />
          &nbsp;
          {likes?.length > 2 ? (
            <span style={{ fontSize: 11 }}>{`You and ${
              likes.length - 1
            } others`}</span>
          ) : (
            `${likes?.length} like${likes?.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        <>
          <FavoriteBorderIcon fontSize="small" />
          &nbsp;{likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <FavoriteBorderIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <>
      <Card className={classes.card}>
        <Paper style={{ position: "relative" }}>
          {user?.result?.userName === post?.name && !edit ? (
            <IconButton
              className={classes.moreHoriz}
              onClick={handleProfileMenuOpen}
            >
              <MoreHorizIcon />
            </IconButton>
          ) : null}

          {edit ? (
            <IconButton className={classes.closeIcon} onClick={handleCloseEdit}>
              <CloseIcon style={{ fontSize: "2rem" }} />
            </IconButton>
          ) : null}

          <CardMedia className={classes.media} image={post.url} />

          <CardContent>
            <Typography
              component={Link}
              to={`/profile/${post.name}`}
              style={{ textDecoration: "none" }}
              className={classes.title}
              color="primary"
              gutterBottom
            >
              {post.name}
            </Typography>

            {!edit ? (
              <>
                <Typography
                  variant="body2"
                  component="p"
                  style={{ fontWeight: 700 }}
                >
                  {post.message}
                </Typography>
                <Typography className={classes.post} color="textSecondary">
                  {String("#" + post.tags)
                    .split(",")
                    .join(", #")}
                </Typography>

                <Typography variant="body2" style={{ color: "#9e9e9e" }}>
                  {moment(post.createdAt).fromNow()}
                </Typography>
              </>
            ) : (
              <>
                <form className={classes.formPost} onSubmit={handleSubmit}>
                  <input
                    type="text"
                    autoFocus={true}
                    placeholder={
                      postData.message === ""
                        ? "Add a description"
                        : post.message
                    }
                    style={{ fontSize: "0.875rem" }}
                    className={classes.formInput}
                    onChange={(e) =>
                      setPostData({ ...postData, message: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder={postData.tags === "" ? "Add tags" : post.tags}
                    style={{
                      fontSize: "1rem",
                      marginBottom: 12,
                      height: "24px",
                    }}
                    className={classes.formInput}
                    onChange={(e) =>
                      setPostData({ ...postData, tags: e.target.value })
                    }
                  />

                  <IconButton className={classes.doneIcon} type="submit">
                    <DoneIcon style={{ fontSize: "2rem" }} />
                  </IconButton>
                </form>
              </>
            )}

            <CardActions
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 0,
              }}
            >
              <Button
                onClick={async () => {
                  if (
                    likes.some((like) => like.from === user.result.userName)
                  ) {
                    const like = likes.find(
                      (like) => like.from === user?.result?.userName
                    );

                    dispatch(dislikePost(like._id, post._id));

                    if (post.name !== user?.result?.userName) {
                      await dispatch(
                        deleteNotification(
                          post._id,
                          user?.result?.userName,
                          "like"
                        )
                      );
                    }
                  } else {
                    dispatch(
                      likePost({
                        from: user.result.userName,
                        likeId: post._id,
                      })
                    );

                    if (post.name !== user.result.userName) {
                      await dispatch(
                        newNotification({
                          notificationId: post._id,
                          type: "like",
                          from: user.result.userName,
                          to: post.name,
                          notification: `${user.result.userName} liked your post`,
                        })
                      );
                    }
                  }
                  socket.emit("send-notification", {
                    notification: "new like",
                    receiver: post.name,
                  });
                }}
                fontSize="medium"
                style={{ cursor: "pointer", padding: 0 }}
                color="secondary"
              >
                <Likes />
              </Button>
              <Button
                onClick={() => {
                  handleExpandClick();
                  setCurrentId(post._id);
                  dispatch(getComments(post._id));
                }}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <span style={{ fontSize: 11 }}>
                  {!expanded ? "See the comments" : "Hide the comments"}
                </span>
                <ExpandMoreIcon
                  align="center"
                  style={{
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "all .3s ease",
                  }}
                />
              </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <form
                style={{ display: "flex", marginTop: "5px" }}
                onSubmit={handleComment}
                onKeyPress={(e) => {
                  if (e.code === "Enter") handleComment(e);
                }}
              >
                <textarea
                  type="text"
                  placeholder="Add a comment!"
                  value={commentData}
                  name="comment"
                  style={{
                    width: "100%",
                    padding: 10,
                    outline: "none",
                    border: "2px solid #f5f6fa",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                  onChange={(e) => setCommentData(e.target.value)}
                />
                <Button type="submit">post</Button>
              </form>
              {post.loading && (
                <div className={classes.flexContainer}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar />
                    <div className={classes.nameContainer}>
                      <span className={classes.span}>
                        {user?.result?.userName}
                      </span>
                    </div>
                  </div>

                  <div className={classes.commentContainer}>
                    <CircularProgress />
                    <IconButton>
                      <FavoriteIcon fontSize="small" />
                    </IconButton>
                    <Button disabled={true}>
                      <MoreVertIcon />
                    </Button>
                  </div>
                </div>
              )}

              {comments?.map((comment, i) => (
                <Comment
                  key={i}
                  comment={comment}
                  setCommentMode={setCommentMode}
                  user={user}
                  comments={comments}
                  deleteNotification={deleteNotification}
                  newNotification={newNotification}
                  post={post}
                  setCommentId={setCommentId}
                  handleProfileMenuOpen={handleProfileMenuOpen}
                />
              ))}
            </Collapse>
          </CardContent>
        </Paper>
        {renderMenu}
      </Card>
    </>
  );
};

export default Post;
