<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router"; // Satukan impor
import eventBus from "../utils/eventBus.js";
// nextTick tidak lagi diperlukan untuk metode ini

// --- State Reaktif ---
const menuActive = ref(false);
const isScrolled = ref(false);
const activeSection = ref("home");
const route = useRoute();
const router = useRouter();

const sectionOffsets = ref({});

// --- Fungsi ---
const toggleMenu = () => {
  menuActive.value = !menuActive.value;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
  const scrollPosition = window.scrollY + window.innerHeight / 2;
  let currentSection = "home"; // Default
  for (const sectionId in sectionOffsets.value) {
    if (scrollPosition >= sectionOffsets.value[sectionId]) {
      currentSection = sectionId;
    }
  }
  activeSection.value = currentSection;
};
const calculateSectionOffsets = () => {
  const sections = document.querySelectorAll("main section[id]");
  const offsets = {};
  sections.forEach((section) => {
    offsets[section.id] = section.offsetTop;
  });
  sectionOffsets.value = offsets;
};

const updateActiveSection = (sectionId) => {
  if (sectionId) {
    activeSection.value = sectionId;
  }
};

const closeMenu = () => {
  menuActive.value = false;
};

// --- PERBAIKAN: Fungsi Navigasi yang Disederhanakan ---
// Kita hanya perlu melakukan navigasi, biarkan router/index.js yang menangani scroll
const navigateToSection = (sectionId) => {
  closeMenu();
  router.push({ path: "/", hash: `#${sectionId}` });
};

// --- Watcher untuk mencegah scroll saat menu mobile aktif ---
watch(menuActive, (isActive) => {
  if (isActive) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

// --- Lifecycle Hooks ---
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  eventBus.on("section-in-view", updateActiveSection);
  window.addEventListener("resize", calculateSectionOffsets);
  handleScroll(); // Panggil sekali di awal untuk set state
});
setTimeout(() => {
  calculateSectionOffsets();
  handleScroll(); // Panggil sekali untuk set state awal
}, 1000);

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  eventBus.off("section-in-view", updateActiveSection);
  window.removeEventListener("resize", calculateSectionOffsets);
  document.body.style.overflow = ""; // Pastikan style body kembali normal
});
</script>

<template>
  <nav
    class="navbar"
    :class="{ scrolled: isScrolled, 'menu-open': menuActive }"
  >
    <div class="container">
      <RouterLink to="/" class="logo" @click="closeMenu">Hda.</RouterLink>

      <!-- Menu untuk desktop -->
      <div class="menu-desktop">
        <a
          @click="navigateToSection('home')"
          :class="{ active: activeSection === 'home' && route.path === '/' }"
          >Home</a
        >
        <a
          @click="navigateToSection('skills')"
          :class="{ active: activeSection === 'skills' && route.path === '/' }"
          >Skills</a
        >
        <a
          @click="navigateToSection('projects')"
          :class="{
            active: activeSection === 'projects' && route.path === '/',
          }"
          >Projects</a
        >
        <RouterLink to="/about" :class="{ active: route.path === '/about' }"
          >About</RouterLink
        >
        <RouterLink to="/blog" :class="{ active: route.path === '/blog' }"
          >Blog</RouterLink
        >
        <RouterLink to="/contact" :class="{ active: route.path === '/contact' }"
          >Contact Me</RouterLink
        >
      </div>

      <!-- Hamburger untuk mobile -->
      <button
        class="hamburger"
        @click="toggleMenu"
        :class="{ active: menuActive }"
        aria-label="Toggle menu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>

    <!-- Menu untuk mobile -->
    <div class="menu-mobile" :class="{ active: menuActive }">
      <a
        @click="navigateToSection('home')"
        :class="{ active: activeSection === 'home' && route.path === '/' }"
        >Home</a
      >
      <a
        @click="navigateToSection('skills')"
        :class="{ active: activeSection === 'skills' && route.path === '/' }"
        >Skills</a
      >
      <a
        @click="navigateToSection('projects')"
        :class="{ active: activeSection === 'projects' && route.path === '/' }"
        >Projects</a
      >
      <RouterLink
        to="/about"
        @click="closeMenu"
        :class="{ active: route.path === '/about' }"
        >About</RouterLink
      >
      <RouterLink
        to="/blog"
        @click="closeMenu"
        :class="{ active: route.path === '/blog' }"
        >Blog</RouterLink
      >
      <RouterLink
        to="/contact"
        @click="closeMenu"
        :class="{ active: route.path === '/contact' }"
        >Contact</RouterLink
      >
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use "sass:color";

// Variabel Warna
$primary: #f05922;
$dark-bg: #111827;
$text-primary: #f9fafb;
$text-secondary: #9ca3af;
$nav-height: 80px;

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 0;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
  color: $text-primary;

  &.scrolled {
    background-color: rgba($dark-bg, 0.85);
    backdrop-filter: blur(10px);
    padding: 1rem 0;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .logo {
    font-size: 1.75rem;
    font-weight: 700;
    color: $text-primary;
    text-decoration: none;
    z-index: 1001; // Pastikan logo di atas overlay menu mobile
  }

  // Common styles untuk link menu
  a {
    color: $text-secondary;
    text-decoration: none;
    font-weight: 500;
    position: relative;
    transition: color 0.3s ease;
    cursor: pointer;

    &.active {
      color: $text-primary;
    }
  }

  .menu-desktop {
    display: none; // Default disembunyikan, aktif di layar besar
    align-items: center;
    gap: 2.5rem;

    a {
      &::after {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: $primary;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s ease-in-out;
      }

      &:hover:not(.btn) {
        color: $text-primary;
        &::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      }

      &.active:not(.btn) {
        color: $primary;
      }
    }
  }

  .hamburger {
    display: flex; // Selalu flex untuk perataan
    flex-direction: column;
    justify-content: space-around;
    width: 25px;
    height: 21px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001;

    .bar {
      height: 3px;
      width: 100%;
      background: $text-primary;
      border-radius: 10px;
      transition: all 0.3s ease-in-out;
    }

    &.active .bar:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    &.active .bar:nth-child(2) {
      opacity: 0;
    }
    &.active .bar:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }
}

.menu-mobile {
  position: fixed;
  top: 0;
  left: 100%; // Mulai dari luar layar kanan
  width: 100%;
  height: 100vh;
  background-color: $dark-bg;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 1000;

  &.active {
    transform: translateX(-100%);
  }

  a {
    font-size: 2rem;
    padding: 0.5rem 1rem;
    &:hover,
    &.active {
      color: $primary;
    }
  }
}

// Media query untuk Desktop
@media (min-width: 769px) {
  .navbar {
    .menu-desktop {
      display: flex;
    }
    .hamburger {
      display: none;
    }
    .menu-mobile {
      display: none;
    }
  }
}

.btn {
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;

  &.btn-primary {
    background-color: $primary;
    color: white;
    &:hover {
      background-color: color.adjust($primary, $lightness: -8%);
      transform: translateY(-2px);
    }
  }
}
</style>
