<template>
  <div id="nav">
    <router-link to="/videos">Videos</router-link> |
    <router-link to="/images">Images</router-link> |
  </div>
  <div class="server-status" :class="{ up: serverStatus }">
    <span>Server is: {{ serverStatus ? "running" : "down" }}</span>
  </div>
  <router-view />
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";

const serverStatus = ref<boolean>();
async function checkHealth() {
  const apiCall = fetch(`${process.env.VUE_APP_API_BASE}/health`, {
    method: "GET",
  }).then((res) => res.status);
  try {
    const res = await apiCall;
    console.log(res);

    res === 200 ? (serverStatus.value = true) : (serverStatus.value = false);
  } catch (e) {
    console.log(e);
  }
}

onMounted(() => {
  checkHealth();
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.server-status {
  display: inline-block;
  align-items: center;
  padding: 5px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  color: #002b19;
  background-color: #ee2500;
}

.up {
  background-color: #00bf6e;
}
</style>
