import "./style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import { vuetify } from "@/plugins/vuetifyPlugin";
import axios from "axios";
import { AxiosPlugin } from "@/plugins/axiosPlugin";

axios.defaults.baseURL = "http://localhost:8000";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(AxiosPlugin);

app.mount("#app");
