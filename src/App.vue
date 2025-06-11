<!-- File: src/App.vue -->
<script setup>
// 1. Impor semua yang dibutuhkan untuk tata letak dan preloader
import { ref, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useHead } from "@vueuse/head";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

// Impor komponen-komponen tata letak
import Navbar from "./components/Navbar.vue";
import SiteFooter from "./components/Footer.vue";
import ScrollToTop from "./components/ScrollToTop.vue";

// 2. Logika Preloader (tidak ada yang berubah di sini)
const isLoading = ref(true);

onMounted(() => {
  // Sembunyikan preloader awal dari index.html jika ada
  const initialPreloader = document.getElementById("initial-preloader");
  if (initialPreloader) {
    initialPreloader.classList.add("hidden");
    setTimeout(() => initialPreloader.remove(), 300);
  }

  // Atur timer 3 detik untuk menyembunyikan loader Lottie
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
});

// 3. Logika untuk Meta Head (tidak ada yang berubah di sini)
useHead({
  title: "Samsul Huda | Portfolio",
  meta: [
    {
      name: "description",
      content:
        "Portfolio website of Samsul Huda, a Frontend Developer and UI Designer.",
    },
    { name: "theme-color", content: "#f05922" },
  ],
});
</script>

<template>
  <!-- Layar Pemuatan Lottie -->
  <div v-if="isLoading" class="lottie-loader">
    <DotLottieVue
      class="lottie-animation"
      src="https://lottie.host/45cc1eb8-0412-452f-9e7e-9ad6f7969c1c/WkiN1Itw5E.lottie"
      autoplay
      loop
    />
    <p class="loading-text">Tunggu Sebentar Ya . . .</p>
  </div>

  <!-- Konten Utama Aplikasi -->
  <div v-else class="app-wrapper">
    <!-- Navbar akan selalu ada di atas -->
    <Navbar />

    <!-- main adalah tempat konten halaman akan dirender -->
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer akan selalu ada di bawah -->
    <SiteFooter />

    <!-- Tombol Scroll to Top akan muncul saat dibutuhkan -->
    <ScrollToTop />
  </div>
</template>

<style lang="scss">
@use "sass:color";

/* === LOTTIE LOADER STYLES === */
.lottie-loader {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #111827;
  z-index: 9999;
  gap: 1rem;
}
.lottie-animation {
  width: 400px;
  height: 400px;
}
.loading-text {
  color: #9ca3af;
  font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: -40px;
}

/* === GLOBAL STYLES === */
:root {
  --font-heading: "Poppins", sans-serif;
  --font-body: "Inter", sans-serif;
  --primary: #f05922;
  --dark-bg: #111827;
  --text-primary-color: #f9fafb;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 100px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  background: var(--dark-bg);
  color: var(--text-primary-color);
  line-height: 1.6;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-heading);
  font-weight: 700; // Default ketebalan untuk judul
}

/* === LAYOUT WRAPPER === */
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1; /* Ini SANGAT PENTING agar konten mengisi ruang */
}

/* === STYLES LAINNYA === */
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #2c3e50;
}
::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .lottie-animation {
    width: 250px;
    height: 250px;
  }
}
</style>
