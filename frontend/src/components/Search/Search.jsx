import { Avatar, Card, Container, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { searchUser } from "../../actions/navigation";
import { useStyles } from "./styles";

const Search = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const search = useSelector((state) => state.search);

  useEffect(() => {
    if (!user) {
      history.push("/auth");
    }
  }, [history, user]);

  useEffect(() => {
    dispatch(searchUser(params?.user));
  }, [dispatch, params.user]);

  return (
    <Container>
      <Card className={classes.card}>
        <h3 align="center" style={{ padding: 5 }}>
          Results:
        </h3>
        {search.map((item, i) => (
          <div key={i} className={classes.item}>
            <Avatar src={item.profilePic} />
            <Typography
              component={Link}
              to={`/profile/${item.userName}`}
              className={classes.username}
            >
              {item.userName}
            </Typography>
          </div>
        ))}
      </Card>
    </Container>
  );
};

export default Search;
