import React, { useState } from "react";

import Modal from "@material-ui/core/Modal";
import { Button, Typography, TextField } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useStyles } from "../styles";
import { useDispatch } from "react-redux";
import { updateDescription } from "../../../actions/userProfile";
import * as api from "../../../api/index";

export default function SettingsModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [descriptionData, setDescriptionData] = useState({
    description: "",
  });
  const [file, setFile] = useState();
  const logUser = JSON.parse(localStorage.getItem("profile"));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clear = () => {
      setDescriptionData({ description: "" });
    };

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

  return (
    <>
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
              <Typography variant="body2" style={{ margin: "5px 0" }}>
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
      </Modal>
    </>
  );
}
