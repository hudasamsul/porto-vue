<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

const handleScroll = () => {
  // Tampilkan tombol jika scroll lebih dari 300px
  isVisible.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Efek scroll halus
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <transition name="fade">
    <button v-if="isVisible" @click="scrollToTop" class="scroll-to-top" aria-label="Scroll to top">
      <i class="fas fa-arrow-up"></i>
    </button>
  </transition>
</template>

<style lang="scss" scoped>
@use "sass:color";
$primary: #f05922;

.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background-color: $primary;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 999;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: color.adjust($primary, $lightness: -8%);
    transform: translateY(-5px);
  }
}

// Transisi untuk fade in/out
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>