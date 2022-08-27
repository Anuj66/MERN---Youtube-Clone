import { createError } from "../error.js";
import Comment from "../models/Comment.js";

export const addComment = async (req, res, next) => {
  try {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    await newComment.save();
    return res
      .status(200)
      .json({ msg: "Comment Saved Successfully", comment: newComment });
  } catch (error) {
    return next(createError(400, error.message));
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Comment.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      const deletedComment = await Comment.findByIdAndDelete(req.params.id);
      return res
        .status(200)
        .json({ msg: "Comment deleted successfully", deletedComment });
    } else {
      return next(createError(403, "User not authorized"));
    }
  } catch (error) {
    return next(createError(401, "User not authorized"));
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    return res.status(200).json({msg: "Comment Listed", comments})
  } catch (error) {
    return next(createError(401, "User not authorized"));
  }
};
