const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const register = async (req, res, next) => {
  const videoId = parseInt(req.params.id);
  const time = req.body.time ? parseInt(req.body.time * 1000) : 0;
  try {
    const vid = await prisma.video.findUnique({
      where: {
        id: videoId,
      },
      include: {
        playback: true,
      },
    });
    if (vid.playback == null || vid.playback == undefined) {
      const playback = await prisma.playback.create({
        data: {
          videoId,
          time,
        },
      });
      res.status(200).send({ playbackId: playback.id });
    }
    res.status(200).send({ playbackId: vid.playback.id });
    await prisma.$disconnect();
  } catch (e) {
    next(e);
  }
};
const update = async (req, res, next) => {
  const time = parseInt(req.body.time * 1000);
  const playbackId = parseInt(req.params.playbackId);
  try {
    await prisma.playback.update({
      where: {
        id: playbackId,
      },
      data: {
        time,
      },
    });
    res.status(200);
    await prisma.$disconnect();
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  const playbackId = req.params.playbackId;
  try {
    const playbackData = await prisma.playback.findUnique({
      where: {
        playbackId,
      },
    });
    res.status(200).send(playbackData);
    await prisma.$disconnect();
  } catch (e) {
    next(e);
  }
};
module.exports = {
  register,
  update,
  get,
};
