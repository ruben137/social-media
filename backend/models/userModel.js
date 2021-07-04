import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
  name:{type:String,required:true},
  userName:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  id:{type:String},
  profilePic:{type:String,default:'profilePic'},
  followers:{type:Array,default:[]},
  following:{type:Array,default:[]},
  description:String,
  isAdmin:{type:Boolean,default:false},
  posts:{type:Number,defaul:0}
  


})
export default mongoose.model('User',userSchema)