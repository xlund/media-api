const axios = require("axios");
const fs = require("fs");
const path = require("path");
const images = require("./images.json");
const videos = require("./videos.json");
const { fileExist, getFilename } = require("./utils.js");

async function fetchImages() {
  await Promise.all(
    images.map(async (imgData) => {
      const { id, origin } = imgData;
      const filename = getFilename(origin);
      const _path = path.resolve("public/images/" + filename);
      if (fileExist(_path)) {
        console.log(`${filename} already exists in /public`);
        return;
      }
      try {
        const image = await axios.get(origin, { responseType: "stream" });
        const file = fs.createWriteStream(_path);
        image.data.pipe(file);

        file.on("finish", async () => {
          console.log(`✨ Image ${id} saved to public/images as ${filename}`);
          Promise.resolve();
          file.close();
        });
      } catch (e) {
        console.log(e);
        file.close();
      }
    })
  );
}

async function fetchVideos() {
  await Promise.all(
    videos.map(async (vidData) => {
      const { id, origin } = vidData;
      try {
        const filename = getFilename(origin);
        const _path = path.resolve("public/videos/" + filename);
        if (fileExist(_path)) {
          console.log(`${filename} already exists in /public`);
          return;
        }
        console.log(`Begin download of video: ${id}`);
        const video = await axios.get(origin, { responseType: "stream" });
        const file = fs.createWriteStream(_path);
        video.data.pipe(file);

        file.on("finish", async () => {
          console.log(`✨ Video ${id} saved to public/videos as ${filename}`);
          Promise.resolve();
          file.close();
        });
      } catch (e) {
        console.log(e);
        fs.close();
      }
    })
  );
}

fetchImages();
fetchVideos();
