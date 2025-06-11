<script setup>
import { ref, watch, computed } from 'vue'; // onMounted dihapus dari impor
import { useRoute, RouterLink } from 'vue-router'; // useRouter dihapus karena tidak digunakan
import { useHead } from '@vueuse/head';
import { gsap } from 'gsap';

const route = useRoute();

const pageData = ref({
  title: '',
  message: '',
  svgPaths: [],
});

const svgArt = {
  '404': [
    "M24 38 A14 14 0 1 1 24 10",
    "M24 10 L20 14",
    "M24 10 L28 14",
    "M20 28 L28 20",
    "M28 28 L20 20",
  ],
  construction: [
    "M14 12 L12 14 L18 20 L20 18 Z",
    "M30 18 L28 20 L34 26 L36 24 Z",
    "M18 30 L20 28 L26 34 L24 36 Z",
    "M18.5 13 A 8 8 0 1 0 13 18.5",
  ],
};

const setPageContent = (mode) => {
  if (mode === '404') {
    pageData.value = {
      title: '404 - Page Not Found',
      message: 'Oops! The page you are looking for does not exist. It might have been moved or deleted.',
      svgPaths: svgArt['404'],
    };
  } else {
    pageData.value = {
      title: 'Feature Under Construction',
      message: "This feature is still being developed. I'm working hard to bring it to you soon!",
      svgPaths: svgArt['construction'],
    };
  }
  useHead({ title: `${pageData.value.title} | Samsul Huda` });
};

const runAnimation = () => {
  const tl = gsap.timeline();
  // Animasi dimulai dengan teks, karena SVG sudah dianimasikan oleh CSS
  tl.from('.utility-title .char', 
    { opacity: 0, y: 20, stagger: 0.05, ease: 'back.out(1.7)' }, 
    "+=0.5"
  );
  tl.from('.utility-message', 
    { opacity: 0, y: 10 }, 
    "-=0.5"
  );
  tl.from('.utility-cta', 
    { opacity: 0, scale: 0.9 }, 
    "-=0.3"
  );
};

watch(() => route.query.mode || route.name, // Perhatikan perubahan mode atau nama rute
  (newValue) => {
    const mode = route.name === 'not-found' ? '404' : 'construction';
    setPageContent(mode);
    // Tunggu DOM update sebelum menjalankan animasi
    setTimeout(runAnimation, 100);
  }, 
  { immediate: true }
);

const splitTitle = computed(() => {
  return pageData.value.title.split('');
});

// onMounted yang berisi console.warn sudah dihapus
</script>

<template>
  <main class="utility-view">
    <div class="container">
      <div class="content-wrapper" data-aos="fade-up">
        <!-- Grafis SVG Animasi -->
        <svg
          class="animated-svg"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path
              v-for="(path, index) in pageData.svgPaths"
              :key="index"
              :d="path"
            />
          </g>
        </svg>

        <!-- Teks Animasi -->
        <h1 class="utility-title">
          <span v-for="(char, index) in splitTitle" :key="index" class="char">{{
            char === " " ? " " : char
          }}</span>
        </h1>
        <p class="utility-message">{{ pageData.message }}</p>

        <!-- Tombol Aksi -->
        <div class="utility-cta">
          <RouterLink to="/" class="btn btn-primary">Go Back Home</RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
$primary: #f05922;
$dark-bg: #111827;
$text-primary: #f9fafb;
$text-secondary: #9ca3af;

.utility-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: $dark-bg;
  color: $text-primary;
  text-align: center;
  overflow: hidden;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.content-wrapper {
  position: relative;
  z-index: 2;
}

.animated-svg {
  width: 100px;
  height: 100px;
  margin-bottom: 2rem;
  stroke: $primary;

  // Fallback CSS jika DrawSVGPlugin tidak ada
  path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw-fallback 2s ease-in-out forwards;
  }
  @for $i from 1 through 5 {
    path:nth-child(#{$i}) {
      animation-delay: #{$i * 0.2}s;
    }
  }
}

@keyframes draw-fallback {
  to {
    stroke-dashoffset: 0;
  }
}

.utility-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  // Memastikan spasi antar karakter terjaga
  .char {
    display: inline-block;
  }
}

.utility-message {
  font-size: 1.1rem;
  color: $text-secondary;
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
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
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba($primary, 0.4);
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .utility-title {
    font-size: 2rem;
  }
}
</style>
