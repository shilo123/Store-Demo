import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";

const app = createApp(App);

// הוספת axios כ-global property
app.config.globalProperties.$axios = axios;

app.use(store).use(router).mount("#app");
