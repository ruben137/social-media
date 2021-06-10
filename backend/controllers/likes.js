import Like from '../models/likes.js'

export const likePost=async(req,res)=>{
  try {
    const like=new Like(req.body)
    const newLike=await like.save()
    res.status(200).json(newLike)
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
}

export const dislikePost=async(req,res)=>{
  const {id}=req.params
  try {
    await Like.findByIdAndDelete(id)
    res.status(200).json(id)
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
}

export const getLikes=async(req,res)=>{
  const {id}=req.params
try {
  const likes=await Like.find({likeId:id})
  res.status(200).json(likes)
} catch (error) {
      res.status(500).json({ message: error });
    console.log(error);
}
}