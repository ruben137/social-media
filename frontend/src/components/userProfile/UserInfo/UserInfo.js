import React, { useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { useStyles } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import FollowButton from "../FollowButton";
import SettingsModal from "../SettingsModal/Settings";
import FollowersModal from "../FollowersModal/FollowersModal";
import FollowingModal from "../FollowingModal/FollowingModal";
import { getNumberOfPosts } from "../../../actions/userProfile";

const UserInfo = ({ setFollowing }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const logUser = JSON.parse(localStorage.getItem("profile"));
  const {user }= useSelector((state) => state.userState);
  const params = useParams();
  const {postsNumber} = useSelector((state) => state.userPosts);
  useEffect(()=>{
    dispatch(getNumberOfPosts(user?.userName))
  },[dispatch,user?.userName])

  return (
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
             {postsNumber}
            <br /> <span style={{ fontWeight: 300 }}>posts</span>
          </p>
        </div>
        <div>
          <FollowersModal />
        </div>
        <div>
          <FollowingModal />
        </div>
        {params?.id === logUser?.result.userName ? (
          <SettingsModal />
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

          <Typography style={{ width: "100%" }}>{user?.description}</Typography>
        </div>
      </div>
    </Container>
  );
};

export default UserInfo;
