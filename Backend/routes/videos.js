import express from "express";
import {verifyToken} from "../verifyToken.js";
import {
    addVideo,
    addView,
    deleteVideo,
    getRandomVideos, getSubsVideos,
    getTrendingVideos,
    getVideo,
    updateVideo
} from "../controllers/video.js";

const router = express.Router();

router.post('/', verifyToken, addVideo)
router.put('/:id', verifyToken, updateVideo)
router.delete('/:id', verifyToken, deleteVideo)
router.get('/find/:id', getVideo)
router.put('/view/:id', addView)
router.get('/trend', getTrendingVideos)
router.get('/random', getRandomVideos)
router.get('/sub', getSubsVideos)

export default router;
