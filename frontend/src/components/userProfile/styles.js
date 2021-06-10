import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  followers: {
    width: "300px",
    padding: "5px 0",
    height: 400,
  },
  card: {
    height: "calc(100vh - 104px)",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  li: {
    listStyle: "none",
    width: "100%",
    margin: "10px 0",
    paddingBottom: 5,
    borderBottom: "1px solid #dfe6e9",
  },
  profile: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
      justifyContent: "center",
    },
  },
  descriptionContainer: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  itemsContainer: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "center",
    },
  },

  image: {
    width: 200,
    height: 200,

    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
      justifyContent: "center",
      width: 160,
      height: 160,
    },
  },
  description: {
    display: "flex",
    justifyContent: "space-between",
    width: 245,
    flexWrap: "wrap",
  },
  [theme.breakpoints.down("md")]: {
    margin: "auto",
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  commentInput: {
    padding: 10,

    outline: "none",
    border: "2px solid #f5f6fa",
    display: "flex",
    flexWrap: "wrap",

    right: 0,
    left: 0,
    bottom: 8,
    margin: "auto",
    width: "75%",
    resize: "none",
  },
  imageContainer: {
    width: "60%",
    height: "80vh",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "80%",
    },
  },
  postImage: {
    width: "60%",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "50%",
    },
  },
  commentContainer: {
    background: "white",
    width: "40%",

    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "50%",
    },
  },
}));
