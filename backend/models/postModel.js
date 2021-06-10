import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  message: String,
  name: String,
  tags: [String],
  selectedFile: String,
  likeCount: { type: Array, default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  url:String
});


postSchema.methods.setUrl=function setUrl(filename){
  this.url=`http://localhost:5000/public/${filename}`
}

    

export default mongoose.model('PostMessage', postSchema);

