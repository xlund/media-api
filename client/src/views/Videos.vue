<template>
  <div class="videos">
    <h1>Videos</h1>
    <div v-for="video in videos" :key="video!.id">
      <div v-if="video != null">
        <CardVue
          :id="video.id"
          :title="video.title"
          :description="video.description"
          :play-length="video.playLength"
          :playback-id="video.playback?.id"
          :playback-time="video.playback?.time"
          card-type="video"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CardVue from "@/components/Card.vue";

const videos = ref();

async function fetchVideos() {
  const fetchOptions = {
    method: "GET",
    headers: {
      "content-type": "video/mp4",
      accept: "video/mp4",
      range: "bytes = 0 -",
    },
  };
  const apiCall = fetch(
    process.env.VUE_APP_API_BASE + "/videos",
    fetchOptions
  ).then((res) => res.json());

  try {
    videos.value = await apiCall;
  } catch (e) {
    console.log(e);
  }
}

onMounted(() => {
  fetchVideos();
});
</script>

<style scoped>
.videos {
  width: 1020px;
  margin: 0 auto;
}
</style>
