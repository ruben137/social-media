import Comment from "../models/comments.js";

export const getComments = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({ commentId: id }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

export const newComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    const newComment = await comment.save();
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    res.status(200).json(id);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

export const likeComment = async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  try {
    if (!comment.likes.includes(req.userId)) {
      await comment.updateOne({ $push: { likes: req.userId } });
    } else {
      await comment.updateOne({ $pull: { likes: req.userId } });
    }
    const updatedComment = await Comment.findById(id);

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
