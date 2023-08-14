<script setup>
import { ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
const route = useRoute();
const active = ref(false);
const show = ref(false);
watch(route, () => {
  if (route.name == "login") {
    show.value = false;
  } else {
    show.value = true;
  }
});
</script>
<template>
  <template v-if="route.name != 'login'">
    <div v-show="show">
      <Sidebar :class="{ active: active }" />
      <section class="home-section">
        <Navbar @active-sidebar="active = !active" />
        <RouterView />
      </section>
    </div>
  </template>
  <template v-if="route.name == 'login'">
    <RouterView />
  </template>
</template>
<style>
@import "./assets/css/layout-handler.css";
</style>
