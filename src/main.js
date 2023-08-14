import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/main.css";
import useAdminApi from "./composables/adminApi";
import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");

router.beforeEach((to, from) => {
  document.title = to.meta.title;
  const { getStorageData } = useAdminApi();
  const { isLogin } = getStorageData();
  if (!isLogin && to.name != "login") {
    return { name: "login" };
  } else if (isLogin && to.name == "login") {
    return { name: "dashboard" };
  }
});
