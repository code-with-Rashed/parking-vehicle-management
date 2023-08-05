<script setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import useAdminApi from "../composables/adminApi";
const router = useRouter();
const { selectAll, results, statusCode, errors, setStorage } = useAdminApi();
onMounted(async () => await selectAll());
const loginCredential = reactive({
  username: "",
  password: "",
});

const loginHandler = () => {
  for (let i = 0; i < results.value.length; i++) {
    if (
      results.value[i].username == loginCredential.username &&
      results.value[i].password == loginCredential.password
    ) {
      setStorage({
        id: results.value[i].id,
        name: results.value[i].name,
        isLogin: true,
      });
      router.push({ name: "dashboard" });
    }
  }
};
</script>
<template>
  <div class="container">
    <div class="login-form">
      <div class="title">Vehicle Parking</div>
      <form @submit.prevent="loginHandler">
        <div class="login-box">
          <label for="username">Username</label>
          <input
            autofocus
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
            maxlength="60"
            v-model.trim="loginCredential.username"
          />
        </div>
        <div class="login-box">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            maxlength="50"
            v-model.trim="loginCredential.password"
          />
        </div>
        <div class="login-box">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
@import "../assets/css/login.css";
</style>
