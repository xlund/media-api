const express = require("express");
const router = express.Router();
const image = require("./controllers/image");
const video = require("./controllers/video");
const playback = require("./controllers/playback");
const utils = require("./controllers/utils");

router.get("/health", utils.health);
router.get("/images", image.getList);
router.get("/images/:id", image.getSingle);
router.get("/videos", video.getList);
router.get("/videos/:id", video.getSingle);
router.post("/videos/:id/playback", playback.register);
router.put("/videos/:id/playback/:playbackId", playback.update);
router.get("/videos/:id/playback/:playbackId", playback.get);

module.exports = router;
