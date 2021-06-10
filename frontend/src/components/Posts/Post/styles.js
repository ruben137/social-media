import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    marginTop: "-4px",
  },
  card: {
    width: "52%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    marginTop: "15px",

    marginBottom: "15px",
    margin: "auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
  },
  post: {
    marginBottom: 12,
  },
  container: {
    maxWidth: "752px",
    position: "relative",
  },

  moreHoriz: {
    position: "absolute",
    right: "30px",
  },
  box: {
    display: "flex",
    marginTop: "15px",
    flexDirection: "column-reverse",
    marginBottom: "15px",
  },
  closeIcon: {
    position: "absolute",
    right: "30px",
  },
  doneIcon: {
    position: "absolute",
    right: "80px",
    top: "0",
  },
  img: {
    width: "100%",
    objectFit: "cover",
  },
  formPost: {
    display: "flex",
    flexWrap: "wrap",
  },
  formInput: {
    border: "none",
    outline: "none",
    width: "100%",
    padding: 0,
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",

    padding: 0,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    width: "100%",
  },

  focus: {
    "&&&": {
      opacity: 0,
    },
  },
  ripple: {
    color: "red",
    opacity: 0,
  },
  commentContainer: {
    display: "flex",

    width:'100%',
    marginLeft:8,
       [theme.breakpoints.down("sm")]: {
      flexDirection:'column',
  
    },
  },
  comment:{
    flexGrow:1
  },
likeButtonContainer:{
display:'flex',
alignItems:'flex-start',
  [theme.breakpoints.down("sm")]:{
  display:'flex',
  justifyContent:'space-between',
  width:'100%' 
  },


},

  noMore: {
    width: "51.5vw",
    margin: "auto",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  flexContainer: {
    display: "flex",

   justifyContent:'space-between',
    alignItems: "flex-start",

    margin: "5px 0",
    [theme.breakpoints.down("sm")]: {
      flexDirection:'column'
    },
  },
  nameContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  span: {
    marginLeft: 5,
    width: "100%",
    textDecoration: "none",
    color: "#182C61",
    fontWeight: 700,
  },
  date: {
    marginLeft: 5,
    color: "#9e9e9e",
  },
}));
