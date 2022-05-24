<template>
  <div v-if="cardType === 'video'" class="video-card">
    <video
      class="player"
      controls
      :src="url"
      type="video/mp4"
      width="400"
      @play="registerPlayback($event, id)"
      @pause="updatePlaybackPointer($event, id, playbackId)"
    ></video>
    <div class="content">
      <div class="header">
        <h2 class="title">{{ title }}</h2>
        <p class="description">{{ description }}</p>
      </div>
      <p class="meta-data">Length: {{ readableTime(playLength!) }}</p>
    </div>
  </div>
  <div v-if="cardType === 'image'" class="image-card">
    <div class="image-container"><img :src="url" alt="" class="image" /></div>

    <div class="content">
      <div class="header">
        <h2 class="title">{{ title }}</h2>
        <p class="description">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
const props = defineProps({
  cardType: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  id: { type: Number, required: true },
  playLength: { type: Number, required: false, default: null },
  playbackId: { type: Number, required: false, default: null },
  playbackTime: { type: Number, required: false, default: null },
});

const url = computed(() => {
  const slug = props.cardType === "video" ? "videos" : "images";
  if (props.playbackTime != null) {
    return `http://localhost:4000/api/${slug}/${props.id}#t=${[
      props.playbackTime / 1000,
    ]},${props.playLength / 1000}`;
  }
  return `http://localhost:4000/api/${slug}/${props.id}`;
});

async function registerPlayback(event: Event, id: number) {
  const target = event.target as HTMLMediaElement;
  const time = target.currentTime;

  const fetchOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ time: time }),
  };
  const apiCall = fetch(
    `${process.env.VUE_APP_API_BASE}/videos/${id}/playback`,
    fetchOptions
  ).then((res) => res);
  try {
    const res = await apiCall;
    console.log(res.body);
  } catch (e) {
    console.log(e);
  }
}
async function updatePlaybackPointer(
  event: Event,
  id: number,
  playbackId?: number
) {
  if (playbackId === null) {
    return;
  }
  const target = event.target as HTMLMediaElement;
  const time = target.currentTime;

  const fetchOptions = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ time: time }),
  };
  const apiCall = fetch(
    `${process.env.VUE_APP_API_BASE}/videos/${id}/playback/${playbackId}`,
    fetchOptions
  ).then((res) => res);
  try {
    const res = await apiCall;
    console.log(res.body);
  } catch (e) {
    console.log(e);
  }
}

function readableTime(ms: number) {
  const seconds = addLeadingZero(Math.floor((ms / 1000) % 60));
  const minutes = addLeadingZero(Math.floor((ms / (1000 * 60)) % 60));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  return `${hours}:${minutes}:${seconds}`;
}

function addLeadingZero(time: number) {
  return (time < 10 ? "0" : "") + time;
}
</script>

<style scoped>
.video-card,
.image-card {
  display: flex;
  margin-bottom: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ededed;
  border-radius: 0 8px 8px 0;
  padding: 20px;
  width: 100%;
  flex: 1;
}

.image {
  width: 400px;
  height: 400px;
  object-fit: cover;
}

.content {
  text-align: left;
}

.player,
.image {
  border-radius: 8px 0 0 8px;
}
.title,
p {
  margin: 0;
}
</style>
