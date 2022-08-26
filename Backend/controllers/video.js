import {createError} from "../error.js";
import Video from "../models/Video.js";

// Add a video
export const addVideo = async (req, res, next) => {
    try {
        const newVideo = new Video({userId: req.user.id, ...req.body})
        const savedVideo = await newVideo.save()
        return res.status(200).json({msg: "Video Saved Successfully", savedVideo})
    } catch (error) {
        return next(createError(400, error.message))
    }
}

// Update a video
export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, 'Video not found'))
        if (req.user.id !== video.userId) return next(createError(401, 'User not authorized'))
        const updateVideo = await Video.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        return res.status(200).json({msg: 'Video updated successfully', updateVideo})
    } catch (error) {
        return next(createError(400, error.message))
    }
}

// Delete a video
export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, 'Video not found'))
        if (req.params.id !== video.userId) return next(createError(401, 'User not authorized'))
        await Video.findByIdAndDelete(req.params.id)
        return res.status(200).json({msg: 'Video deleted successfully', deletedVideo: video})
    } catch (error) {
        return next(createError(400, error.message))
    }
}

// Get a video
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, 'Video not found'))
        return res.status(200).json({msg: 'Video found', video})
    } catch (error) {
        return next(createError(400, error.message))
    }
}

// Add view
export const addView = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, 'Video not found'))
        return res.status(200).json({msg: 'Video found', video})
    } catch (error) {
        return next(createError(400, error.message))
    }
}

// Get trending videos
export const getTrendingVideos = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, 'Video not found'))
        return res.status(200).json({msg: 'Video found', video})
    } catch (error) {
        return next(createError(400, error.message))
    }
}

// Get random videos
export const getRandomVideos = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, 'Video not found'))
        return res.status(200).json({msg: 'Video found', video})
    } catch (error) {
        return next(createError(400, error.message))
    }
}

// Get subscribers videos
export const getSubsVideos = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, 'Video not found'))
        return res.status(200).json({msg: 'Video found', video})
    } catch (error) {
        return next(createError(400, error.message))
    }
}