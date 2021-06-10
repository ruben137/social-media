import React from "react";
import { deleteNotification, newNotification } from "../../actions/navigation";
import { follow } from "../../actions/userProfile";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import socket from "../Messages/SocketProvider";

const FollowButton = ({ user, logUser }) => {
  const dispatch = useDispatch();
  const { loading } = user;

  if (user?.followers?.length > 0) {
    return user.followers.find(
      (follower) => follower === logUser?.result?.userName
    ) ? (
      <Button
        style={{
          backgroundColor: "#e74c3c",
          color: "white",
          fontWeight: 700,
        }}
        variant="contained"
        fullWidth
        onClick={async () => {
          if (!loading) {
            await dispatch(follow(user?._id));
            await dispatch(
              deleteNotification(user._id, logUser?.result?.userName, "follow")
            );
            socket.emit("send-notification", {
              notification: "new follow",
              receiver: user.userName,
            });
          }
        }}
      >
        unfollow
      </Button>
    ) : (
      <Button
        style={{
          backgroundColor: "#35baf6",
          color: "white",
          fontWeight: 700,
        }}
        variant="contained"
        fullWidth
        onClick={async () => {
          if (!loading) {
            await dispatch(follow(user?._id));
            await dispatch(
              newNotification({
                notificationId: user._id,
                type: "follow",
                from: logUser.result.userName,
                to: user.userName,
                notification: `${logUser.result.userName} started following you`,
              })
            );
            socket.emit("send-notification", {
              notification: "new follow",
              receiver: user.userName,
            });
          }
        }}
      >
        Follow
      </Button>
    );
  }

  return (
    <>
      <Button
        style={{
          backgroundColor: "#35baf6",
          color: "white",
          fontWeight: 700,
          cursor: "pointer",
        }}
        onClick={async () => {
          if (!loading) {
            console.log(user);
            await dispatch(follow(user?._id));
            await dispatch(
              newNotification({
                notificationId: user._id,
                type: "follow",
                from: logUser.result.userName,
                to: user.userName,
                notification: `${logUser.result.userName} started following you`,
              })
            );
            socket.emit("send-notification", {
              notification: "new follow",
              receiver: user.userName,
            });
          }
        }}
        variant="contained"
        fullWidth
      >
        Follow
      </Button>
    </>
  );
};

export default FollowButton;
