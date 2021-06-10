import {  makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(() => ({
mainContainer:{
  display:'flex',
  height:'calc(100vh - 67px)',
  justifyContent:'center',alignItems:'center',

},
container:{
  width:'90%',
  background:'white',
  height:'90%',
  borderRadius:10,
  border:'1px solid #7f8fa6',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  flexWrap:'wrap'},
  
  textContainer:{
  display: "flex", 
  alignItems: "center" },
 
  error:{
    display: "inline-block", 
    flexGrow: 1 
  }

}));
  