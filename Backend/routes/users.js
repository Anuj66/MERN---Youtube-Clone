import express from "express";
import {
    deleteUser,
    dislikeVideo,
    getUser,
    likeVideo,
    subscribeUser,
    unsubscribeUser,
    updateUser
} from "../controllers/user.js";
import {verifyToken} from "../verifyToken.js";

const router = express.Router();

// Update a user
router.put('/:id', verifyToken, updateUser)

// Delete a user
router.delete('/:id', verifyToken, deleteUser)

// Get a user
router.get('/find/:id', getUser)

// Subscribe a user
router.put('/sub/:id', verifyToken, subscribeUser)

// Unsubscribe a user
router.put('/unsub/:id', verifyToken, unsubscribeUser)

// Like a video
router.put('/like/:videoId', likeVideo)

// Dislike a video
router.put('/dislike/:videoId', dislikeVideo)

export default router;
