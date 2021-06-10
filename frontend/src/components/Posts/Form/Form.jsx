import React, { useState, useRef } from "react";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { createPost } from "../../../actions/posts";
import AddIcon from "@material-ui/icons/Add";
import Collapse from "@material-ui/core/Collapse";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const selectedFile = useRef();
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [postData, setPostData] = useState({
    name: "",
    message: "",
    tags: "",
  });
  const [file, setFile] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();

  const clear = () => {
    setCurrentId(0);
    setPostData({
      message: "",
      tags: "",
    });

    selectedFile.current.value = "";
    setError(false);
    setFile(null);
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setError(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      if (!file) {
        setError(true);
        return;
      }

      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", user?.result?.userName);
        formData.append("message", postData.message);
        formData.append("tags", postData.tags);

        await dispatch(createPost(formData));
        setPostData({
          name: "",
          message: "",
          tags: "",
          selectedFile: "",
        });
      }
      clear();
      setTimeout(() => {
        setShowForm(false);
        setError(false);
      }, 1000);
    }
  };
  const handleShowForm = () => {
    setShowForm(true);
    setCurrentId(0);
  };

  return (
    <>
      <div className={classes.container}>
        <Button color="primary" variant="contained" onClick={handleShowForm}>
          <AddIcon />
          Share a post!
        </Button>
      </div>

      <Collapse in={showForm}>
        <Paper className={classes.paper}>
          <Container>
            <form
              autoComplete="off"
              onSubmit={onSubmit}
              className={`${classes.root} ${classes.form}`}
            >
              <Typography align="center" variant="h6">
                Create a post
              </Typography>

              <TextField
                fullWidth
                name="message"
                label="Message"
                value={postData.message}
                onChange={(e) =>
                  setPostData({ ...postData, message: e.target.value })
                }
              />
              <TextField
                fullWidth
                name="tags"
                label="Tags"
                value={postData.tags}
                onChange={(e) =>
                  setPostData({ ...postData, tags: e.target.value.split(",") })
                }
              />

              <input type="file" ref={selectedFile} onChange={handleChange} />
              <span style={{ color: "#EA2027" }}>
                {error && <p>You need to provide a file</p>}
              </span>
              <br />

              <Button
                variant="contained"
                type="submit"
                color="primary"
                className={classes.shareButton}
              >
                Share
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.closeButton}
                onClick={() => setShowForm(false)}
              >
                Close
              </Button>
            </form>
          </Container>
        </Paper>
      </Collapse>
    </>
  );
};

export default Form;
