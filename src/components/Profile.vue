<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import useAdminApi from "../composables/adminApi";
const { results, errors, statusCode, select, update } = useAdminApi();
const route = useRoute();
onMounted(() => select(route.params.id));
const profileForm = async () => {
  await update(results.value, route.params.id);
};
const passwordShow = ref(true);
</script>
<template>
  <div class="main-content">
    <div class="content-box">
      <div class="content-wrap">
        <div class="content-status">
          <h1>Edit Profile</h1>
        </div>
        <div class="vehicle-form">
          <form @submit.prevent="profileForm">
            <div class="form-box">
              <label for="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                required
                maxlength="50"
                v-model.trim="results.name"
              />
            </div>
            <div class="form-box">
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                maxlength="50"
                v-model.trim="results.email"
              />
            </div>
            <div class="form-box">
              <label for="phone">Phone Number</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                required
                maxlength="12"
                v-model.trim="results.phone"
              />
            </div>
            <div class="form-box">
              <label for="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                required
                maxlength="50"
                v-model.trim="results.username"
              />
            </div>
            <div class="form-box">
              <label for="password">Password</label>
              <input
                :type="passwordShow ? 'password' : 'text'"
                name="password"
                id="password"
                maxlength="50"
                v-model.trim="results.password"
                @focusin="passwordShow = false"
                @focusout="passwordShow = true"
              />
            </div>
            <div class="form-submit-box">
              <input type="submit" value="Update" name="save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../assets/css/vehicle-form-page.css";
</style>
