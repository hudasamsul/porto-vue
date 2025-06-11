import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import App from "./App.vue";
import router from "./router";
import AOS from "aos";

// Import CSS
import "aos/dist/aos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Buat instance Vue App
const app = createApp(App);
// Buat instance Head untuk SEO
const head = createHead();

// Gunakan plugin
app.use(router);
app.use(head); // Gunakan plugin head

// Pasang aplikasi ke DOM
app.mount("#app");

// Inisialisasi AOS setelah aplikasi terpasang
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
});
