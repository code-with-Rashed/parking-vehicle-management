<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import useAdminApi from "../composables/adminApi";
const router = useRouter();
const { getStorageData, logout } = useAdminApi();
const { id, name } = getStorageData();
const logoutNow = () => {
  logout();
  router.push({ name: "login" });
};
const showLinks = ref(false);
</script>
<template>
  <nav class="top-nav">
    <div class="sidebar-button" @click="$emit('activeSidebar')">
      <img src="../assets/image/menu.png" alt="##" />
    </div>
    <div class="profile-details" @click="showLinks = !showLinks">
      <img src="../assets/image/user.jpg" alt="profile-image" />
      <span class="admin-name">Hi, {{ name }}</span>
      <div class="profile-options" :class="{ show: showLinks }">
        <RouterLink
          :to="{ name: 'profile', params: { id: id } }"
          class="profile-link"
        >
          My Profile
        </RouterLink>
        <a href="javascript:void(0)" @click="logoutNow" class="profile-link">
          Logout
        </a>
      </div>
    </div>
  </nav>
</template>
<style scoped>
@import "../assets/css/navbar.css";
</style>
