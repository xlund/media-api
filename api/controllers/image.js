const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");

const getList = async (req, res, next) => {
  try {
    const images = await prisma.image.findMany();
    res.status(200).send(images);
  } catch (e) {
    next(e);
  }
};
const getSingle = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const img = await prisma.image.findUnique({ where: { id } });
    res.sendFile(path.resolve("public/images/" + img.filename));
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getSingle,
  getList,
};
