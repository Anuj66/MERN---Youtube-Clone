import {createError} from "../error.js";
import User from "../models/User.js";

// Update a user
export const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })
            return res.status(200).json({msg: "User updated successfully", user: updatedUser})
        } catch (err) {
            return next(createError(400, err.message))
        }
    } else {
        return next(createError(401, "You can update only your account"))
    }
}

// Delete a user
export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const findUser = await User.findById(req.params.id)
            if (!findUser) return res.status(200).json({msg: "User does not exists"})
            await User.findByIdAndDelete(req.params.id)
            return res.status(200).json({msg: "User has been deleted successfully", user: findUser})
        } catch (error) {
            return next(createError(400, error.message))
        }
    } else {
        return next(createError(401, "You can delete only your account"))
    }
}

// Get a user
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(200).json({msg: "User not found"})
        const {password, ...otherDetails} = user._doc
        return res.status(200).json({msg: "User found", user: otherDetails})
    } catch (error) {
        return next(createError(400, error.message))
    }
}

// Subscribe a user
export const subscribeUser = async (req, res, next) => {
    try {
        await User.findById(req.user.id, {
            $push: {subscribedUser: req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: 1}
        })
        return res.status(200).json({ msg: "Subscription successful" })
    } catch (error) {
        return next(createError(400, error.message))
    }
}

// Unsubscribe a user
export const unsubscribeUser = async (req, res, next) => {
    try {
        await User.findById(req.user.id, {
            $pull: {subscribedUser: req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: -1}
        })
        return res.status(200).json({ msg: "Subscription cancelled successfully" })
    } catch (error) {
        return next(createError(400, error.message))
    }
}

// Like a video
export const likeVideo = (req, res, next) => {

}

// Dislike a video
export const dislikeVideo = (req, res, next) => {

}

