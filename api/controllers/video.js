const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");

const getList = async (req, res, next) => {
  try {
    const videos = await prisma.video.findMany({ include: { playback: true } });
    res.status(200).send(videos);
    await prisma.$disconnect();
  } catch (e) {
    next(e);
  }
};
const getSingle = async (req, res, next) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  const id = parseInt(req.params.id);
  try {
    try {
      const vid = await prisma.video.findUnique({ where: { id } });
      const _path = path.resolve("public/videos/" + vid.filename);
      const videoSize = fs.statSync("public/videos/" + vid.filename).size;
      const CHUNK_SIZE = 10 ** 6; // 1MBa
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": vid.playLength,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, headers);
      const stream = fs.createReadStream(_path, { start, end });
      stream.pipe(res);
    } catch (e) {
      next(e);
    }
  } catch (e) {
    next(e);
  }
};

const getPoster = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const img = await prisma.video.findUnique({ where: { id } });
    res.sendFile(path.resolve("public/videos/posters/" + img.poster));
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getList,
  getSingle,
  getPoster,
};
