<template>
  <div class="images">
    <h1>Images</h1>
    <div v-for="image in images" :key="image!.id">
      <div v-if="image != null">
        <CardVue
          :id="image.id"
          :title="image.title"
          :description="image.description"
          :play-length="image.playLength"
          card-type="image"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CardVue from "@/components/Card.vue";

const images = ref();

async function fetchVideos() {
  const fetchOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };
  const apiCall = fetch(
    process.env.VUE_APP_API_BASE + "/images",
    fetchOptions
  ).then((res) => res.json());

  try {
    images.value = await apiCall;
    console.log(images);
  } catch (e) {
    console.log(e);
  }
}

onMounted(() => {
  fetchVideos();
});
</script>

<style scoped>
.images {
  width: 1020px;
  margin: 0 auto;
}
</style>
