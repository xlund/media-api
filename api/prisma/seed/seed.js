const { PrismaClient } = require("@prisma/client");
const imgJson = require("../../utils/images.json");
const vidJson = require("../../utils/videos.json");
const getFilename = require("../../utils/utils");
const prisma = new PrismaClient();

async function seed() {
  // Seed images
  Promise.all(
    imgJson.map(async (imgData) => {
      const { id, title, description, origin } = imgData;
      const filename = getFilename(origin);
      try {
        await prisma.image.create({
          data: {
            id,
            title,
            description,
            filename,
          },
        });
      } catch (e) {
        console.log(e);
      }
    })
  );
  // Seed videos
  Promise.all(
    vidJson.map(async (vidData) => {
      const { id, title, description, origin, length } = vidData;
      const filename = getFilename(origin);
      try {
        await prisma.video.create({
          data: {
            id,
            title,
            description,
            playLength: length,
            filename,
          },
        });
      } catch (e) {
        console.log(e);
      }
    })
  );
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
