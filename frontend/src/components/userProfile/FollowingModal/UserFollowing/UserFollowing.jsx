import React, { useEffect } from "react";
import { useStyles } from "../../styles";
import { Typography, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfilePic } from "../../../../actions/userProfile";

const UserFollowing = ({ handleClose, following }) => {
  const dispatch=useDispatch()
  const userPostsState = useSelector((state) => state.userPosts);
  const { users } = userPostsState;
  const user = users.find((user) => user.name === following);
  useEffect(()=>{
    dispatch(getProfilePic(following))
  },[dispatch,following])
  const classes = useStyles();

  return (
    <li className={classes.li}>
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
            to={`/profile/${following}`}
            onClick={handleClose}
          >
            {following}
          </Typography>
          <Avatar 
          src={user?.profilePic} 
          />
        </div>
      </div>
    </li>
  );
};

export default UserFollowing;
