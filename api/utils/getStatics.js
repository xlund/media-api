const axios = require("axios");
const fs = require("fs");
const path = require("path");
const images = require("./images.json");
const videos = require("./videos.json");
const { fileExist, getFilename } = require("./utils.js");

module.exports.fetchImages = async () => {
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
        console.log(`Start download of img ${id}`);
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
};

module.exports.fetchPosters = async () => {
  await Promise.all(
    videos.map(async (imgData) => {
      const { id, poster } = imgData;
      const filename = getFilename(poster);
      const _path = path.resolve("public/videos/posters/" + filename);
      if (fileExist(_path)) {
        console.log(`${filename} already exists in /public/videos/posters`);
        return;
      }
      try {
        console.log(`Start download of poster for video ${id}`);
        const image = await axios.get(poster, { responseType: "stream" });
        const file = fs.createWriteStream(_path);
        image.data.pipe(file);

        file.on("finish", async () => {
          console.log(
            `✨ Poster for movie ${id} saved to public/videos/posters as ${filename}`
          );
          Promise.resolve();
          file.close();
        });
      } catch (e) {
        console.log(e);
        file.close();
      }
    })
  );
};

module.exports.fetchVideos = async () => {
  await Promise.all(
    videos.map(async (vidData) => {
      const { id, origin } = vidData;
      const filename = getFilename(origin);
      const _path = path.resolve("public/videos/" + filename);
      if (fileExist(_path)) {
        console.log(`${filename} already exists in /public`);
        return;
      }
      try {
        console.log(`Downloding movie ${filename} [ID: ${id}]`);
        const video = await axios.get(origin, { responseType: "stream" });
        const file = fs.createWriteStream(_path);
        video.data.pipe(file);

        file.on("finish", async () => {
          console.log(`🍿 Video ${id} saved to public/videos as ${filename}`);
          Promise.resolve();
          file.close();
        });
      } catch (e) {
        console.log(e);
        fs.close();
      }
    })
  );
};
