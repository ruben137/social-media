import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  paper: {
    maxWidth: "704px",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "40px",
    padding: "20px",
  },
  shareButton: { marginTop: "10px" },
  closeButton: {
    marginTop: "10px",
    marginLeft: "10px",
  },
}));
