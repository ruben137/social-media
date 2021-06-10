import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  noMore: {
    width: "51.5vw",
    margin: "auto",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  postsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
  },
}));
