import { createError } from "../error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";

// Add a video
export const addVideo = async (req, res, next) => {
  try {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    const savedVideo = await newVideo.save();
    return res
      .status(200)
      .json({ msg: "Video Saved Successfully", savedVideo });
  } catch (error) {
    return next(createError(400, error.message));
  }
};

// Update a video
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));
    if (req.user.id !== video.userId)
      return next(createError(401, "User not authorized"));
    const updateVideo = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ msg: "Video updated successfully", updateVideo });
  } catch (error) {
    return next(createError(400, error.message));
  }
};

// Delete a video
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));
    if (req.params.id !== video.userId)
      return next(createError(401, "User not authorized"));
    await Video.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ msg: "Video deleted successfully", deletedVideo: video });
  } catch (error) {
    return next(createError(400, error.message));
  }
};

// Get a video
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));
    return res.status(200).json({ msg: "Video found", video });
  } catch (error) {
    return next(createError(400, error.message));
  }
};

// Add view
export const addView = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );
    if (!video) return next(createError(404, "Video not found"));
    return res.status(200).json({ msg: "Views updated", video });
  } catch (error) {
    return next(createError(400, error.message));
  }
};

// Get trending videos
export const getTrendingVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    return res.status(200).json({ msg: "Trending Videos", videos });
  } catch (error) {
    return next(createError(400, error.message));
  }
};

// Get random videos
export const getRandomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    return res.status(200).json({ msg: "Random Videos", videos });
  } catch (error) {
    return next(createError(400, error.message));
  }
};

// Get subscribers videos
export const getSubsVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const videos = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );

    return res.status(200).json({
      msg: "Videos of Subscribed Channels",
      videos: videos.flat().sort((a, b) => b.createdAt - a.createdAt),
    });
  } catch (error) {
    return next(createError(400, error.message));
  }
};

// Get videos by tags
export const getVideosByTags = async (req, res, next) => {
  try {
    const tags = req.query.tags.split(",")
    const videos = await Video.find({tags: {$in: tags}}).limit(20)
    return res.status(200).json({msg: "Videos filtered by tags", videos})
  } catch (error) {
    return next(createError(400, error.message));
  }
};

// Get videos by search
export const getVideosBySearch = async (req, res, next) => {
  try {
    const query = req.query.q
    const videos = await Video.find({title: {$regex: query, $options: "i"}})
    return res.status(200).json({msg: "Videos filtered by query", videos})
  } catch (error) {
    return next(createError(400, error.message));
  }
};