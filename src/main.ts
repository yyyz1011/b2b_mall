import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus, { ElMessage } from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

app.config.globalProperties.$catch = (message: string) =>
  ElMessage.error(message);

app.use(router);
app.use(ElementPlus);
app.mount("#app");
