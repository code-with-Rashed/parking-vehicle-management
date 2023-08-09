<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="sidebar">
    <div class="logo-details">
      <span class="logo-name">Vehicle Management</span>
    </div>
    <ul class="sidebar-links">
      <li>
        <RouterLink :to="{ name: 'dashboard' }"> Dashboard </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'vehicle-category' }">
          Vehicle Category
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'incoming-vehicles' }">
          Manage Incoming Vehicles
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'outgoing-vehicles' }">
          Manage Outgoing Vehicles
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'search-report' }"> Search Report </RouterLink>
      </li>
    </ul>
  </div>
</template>
<style scoped>
@import "../assets/css/sidebar.css";
</style>
