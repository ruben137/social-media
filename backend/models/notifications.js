import mongoose from 'mongoose'
const notifications=new mongoose.Schema({
  notificationId:String,
  type:String,
  from:String,
  to:String,
  notification:String
   },
  { timestamps: true }
)

export default mongoose.model('notifications',notifications)