<script setup>
// 1. Impor semua yang dibutuhkan
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue"; // <-- TAMBAHKAN nextTick
import { RouterLink, useRoute } from "vue-router"; // <-- Cukup useRoute
import { useHead } from "@vueuse/head";
import eventBus from "../utils/eventBus.js";
import { allProjects } from "@/data/projects.js";
import { useTextScramble } from "@/composables/useTextScramble.js";

// 2. Definisikan semua data sebagai state reaktif
const heroBackgroundImage = ref(
  new URL("@/assets/hero-background.jpg", import.meta.url).href
);
const feature1Image = ref(
  new URL("@/assets/feature-1.jpg", import.meta.url).href
);
const feature2Image = ref(
  new URL("@/assets/feature-2.jpg", import.meta.url).href
);
const testimonialBgImage = ref(
  new URL("@/assets/testimonial-bg.jpg", import.meta.url).href
);

const testimonials = ref([
  {
    quote: "Working with Samsul has been a fantastic experience...",
    author: "John Doe",
    title: "CEO at Company",
    image: new URL("@/assets/client1.jpg", import.meta.url).href,
    rating: 5,
  },
  {
    quote: "A true professional who understands both the technical...",
    author: "Jane Smith",
    title: "Project Manager, Innovate Ltd.",
    image: new URL("@/assets/client2.jpg", import.meta.url).href,
    rating: 5,
  },
  {
    quote: "The final product is not only functional but also beautiful...",
    author: "Sara Wilson",
    title: "Lead Designer",
    image: new URL("@/assets/client1.jpg", import.meta.url).href,
    rating: 4,
  },
]);

const skills = ref([
  { name: "Vue.js", icon: "fab fa-vuejs" },
  { name: "JavaScript", icon: "fab fa-js-square" },
  { name: "SCSS", icon: "fab fa-sass" },
  { name: "Python", icon: "fab fa-python" }, // <-- Perbaikan typo Python
  { name: "CSS", icon: "fab fa-css3-alt" },
  { name: "HTML5", icon: "fab fa-html5" },
]);

const techLogos = ref([
  {
    name: "CodeIgniter",
    src: new URL("@/assets/logo/codeigniter.png", import.meta.url).href,
  },
  { name: "CSS", src: new URL("@/assets/logo/css.png", import.meta.url).href },
  {
    name: "TailwindCSS",
    src: new URL("@/assets/logo/tailwindcss.png", import.meta.url).href,
  },
  {
    name: "Vue.js",
    src: new URL("@/assets/logo/vue.png", import.meta.url).href,
  },
  {
    name: "Python",
    src: new URL("@/assets/logo/python.png", import.meta.url).href,
  },
  {
    name: "JavaScript",
    src: new URL("@/assets/logo/js.png", import.meta.url).href,
  },
]);

const featuredProjects = computed(() => {
  return allProjects.value.slice(0, 3);
});

// 3. Logika Tambahan
const home = ref(null);
const skillsRef = ref(null);
const projects = ref(null);
let observer = null;

const showScrollTopButton = ref(false);
const handleScroll = () => {
  showScrollTopButton.value = window.scrollY > 400;
};
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const currentTestimonialIndex = ref(0);
let testimonialAutoplayInterval = null;
const currentTestimonial = computed(
  () => testimonials.value[currentTestimonialIndex.value]
);
const goToTestimonial = (index) => {
  currentTestimonialIndex.value = index;
  clearInterval(testimonialAutoplayInterval);
  startTestimonialAutoplay();
};
const startTestimonialAutoplay = () => {
  testimonialAutoplayInterval = setInterval(() => {
    currentTestimonialIndex.value =
      (currentTestimonialIndex.value + 1) % testimonials.value.length;
  }, 5000);
};

// useTextScramble untuk efek teks
const { scrambledText: heroTitle, setText: setHeroTitle } = useTextScramble();
const { scrambledText: heroHighlight, setText: setHeroHighlight } =
  useTextScramble();

// PERBAIKAN: Gunakan 'route' bukan 'router' untuk membaca info
const route = useRoute();

onMounted(async () => {
  // --- Logika untuk Intersection Observer (Scrollspy) ---
  const options = { root: null, rootMargin: "0px", threshold: 0.4 };
  const handleIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        eventBus.emit("section-in-view", entry.target.id);
      }
    });
    if (window.scrollY < 400) {
      eventBus.emit("section-in-view", "home");
    }
  };
  observer = new IntersectionObserver(handleIntersect, options);
  if (home.value) observer.observe(home.value);
  if (skillsRef.value) observer.observe(skillsRef.value);
  if (projects.value) observer.observe(projects.value);

  // --- Logika untuk Scroll dari Halaman Lain (Fallback) ---
  // PERBAIKAN: Pindahkan logika ini ke luar dari handleIntersect
  if (route.hash) {
    await nextTick(); // Tunggu DOM siap
    const element = document.querySelector(route.hash);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
  }

  // --- Event listener dan animasi lainnya ---
  window.addEventListener("scroll", handleScroll);
  startTestimonialAutoplay();

  await new Promise((resolve) => setTimeout(resolve, 500));
  await setHeroTitle("Hi, I'm ");
  await setHeroHighlight("Samsul Huda");
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  window.removeEventListener("scroll", handleScroll);
  clearInterval(testimonialAutoplayInterval);
});

useHead({
  title: "Samsul Huda | Frontend Developer & UI Designer",
  meta: [
    {
      name: "description",
      content:
        "Portofolio pribadi Samsul Huda, seorang frontend developer yang bersemangat dalam membangun web experience yang indah dan responsif.",
    },
  ],
});
</script>

<template>
  <main class="home-view">
    <section
      ref="home"
      id="home"
      class="hero-section"
      :style="{ backgroundImage: 'url(' + heroBackgroundImage + ')' }"
    >
      <div class="container hero-content">
        <h1 data-aos="fade-up">
          <span v-html="heroTitle"></span
          ><span class="highlight" v-html="heroHighlight"></span>
        </h1>
        <h2 data-aos="fade-up" data-aos-delay="100">
          Frontend Developer & UI Designer
        </h2>
        <div class="cta-buttons" data-aos-fade-up data-aos-delay="200">
          <RouterLink to="/projects" class="btn btn-primary"
            >View My Work</RouterLink
          >
          <RouterLink to="/contact" class="btn btn-secondary"
            >Contact Me</RouterLink
          >
        </div>
      </div>
    </section>

    <section ref="skillsRef" id="skills" class="skills-section section-padding">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2>My Skills</h2>
          <div class="divider"></div>
        </div>
        <div class="skills-grid">
          <div
            v-for="(skill, index) in skills"
            :key="index"
            class="card skill-card"
            data-aos="fade-up"
            :data-aos-delay="50 * index"
          >
            <div class="skill-icon"><i :class="skill.icon"></i></div>
            <h3 class="skill-name">{{ skill.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <section class="features-section section-padding">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2>What I Do</h2>
          <p class="section-subtitle">
            I provide solutions to bring your digital ideas to life.
          </p>
        </div>
        <div class="features-list">
          <div class="feature-item" data-aos="fade-right">
            <div class="feature-image">
              <img :src="feature1Image" alt="Web Development" />
            </div>
            <div class="feature-content">
              <div class="feature-icon"><i class="fas fa-code"></i></div>
              <h3>Modern Web Development</h3>
              <p>
                I build fast, responsive, and scalable web applications using
                modern frameworks like Vue.js. Every line of code is written
                with performance and maintainability in mind.
              </p>
            </div>
          </div>
          <div class="feature-item reverse" data-aos="fade-left">
            <div class="feature-image">
              <img :src="feature2Image" alt="UI/UX Design" />
            </div>
            <div class="feature-content">
              <div class="feature-icon">
                <i class="fas fa-pencil-ruler"></i>
              </div>
              <h3>Intuitive UI/UX Design</h3>
              <p>
                A great product starts with a great user experience. I design
                user-centric interfaces that are not only beautiful but also
                intuitive and easy to use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      ref="projects"
      id="projects"
      class="projects-section section-padding"
    >
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2>Featured Projects</h2>
          <div class="divider"></div>
        </div>
        <div class="projects-grid">
          <div
            v-for="project in featuredProjects"
            :key="project.id"
            class="card project-card"
            data-aos="fade-up"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="project-image"
            />
            <div class="project-overlay">
              <div>
                <p class="project-category">{{ project.category }}</p>
                <h3 class="project-title">{{ project.title }}</h3>
              </div>
              <RouterLink
                :to="`/projects/${project.id}`"
                class="btn btn-primary btn-small"
                >View Details</RouterLink
              >
            </div>
          </div>
        </div>
        <div class="view-all" data-aos="fade-up">
          <RouterLink to="/projects" class="btn btn-primary"
            >View All Projects</RouterLink
          >
        </div>
      </div>
    </section>

    <section
      class="testimonials-section section-padding"
      :style="{ backgroundImage: 'url(' + testimonialBgImage + ')' }"
    >
      <div class="container">
        <div class="testimonial-content-wrapper" data-aos="fade-up">
          <Transition name="slide-fade" mode="out-in">
            <div class="testimonial-item" :key="currentTestimonialIndex">
              <img
                :src="currentTestimonial.image"
                :alt="currentTestimonial.author"
                class="testimonial-author-image"
              />
              <h4 class="testimonial-author-name">
                {{ currentTestimonial.author }}
              </h4>
              <p class="testimonial-author-title">
                {{ currentTestimonial.title }}
              </p>
              <div class="star-rating">
                <i
                  v-for="star in 5"
                  :key="star"
                  class="fas fa-star"
                  :class="{ active: star <= currentTestimonial.rating }"
                ></i>
              </div>
              <p class="testimonial-quote">“{{ currentTestimonial.quote }}”</p>
            </div>
          </Transition>
          <div class="testimonial-pagination">
            <button
              v-for="(item, index) in testimonials"
              :key="index"
              @click="goToTestimonial(index)"
              class="dot"
              :class="{ active: index === currentTestimonialIndex }"
              :aria-label="`Go to testimonial ${index + 1}`"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <footer class="site-footer">
      <div class="container">
        <div class="footer-cta" data-aos="fade-up">
          <h2>Interested in working with me?</h2>
          <RouterLink to="/contact" class="btn btn-primary"
            >Let's Talk</RouterLink
          >
        </div>
        <div class="footer-tech-grid" data-aos="fade-up" data-aos-delay="100">
          <div
            v-for="(logo, index) in techLogos"
            :key="index"
            class="tech-logo"
          >
            <img :src="logo.src" :alt="logo.name" />
          </div>
        </div>
      </div>
    </footer>
  </main>
</template>

<style lang="scss" scoped>
@use "sass:color";

// === 1. KONFIGURASI & VARIABEL ===
$primary: #f05922;
$dark-bg: #111827;
$dark-card: #1f2937;
$dark-border: #374151;
$text-primary: #f9fafb;
$text-secondary: #9ca3af;
$star-color: #ffc107;

// === 2. GAYA GLOBAL & UTILITIES ===
.home-view {
  background-color: $dark-bg;
  color: $text-primary;
}
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.section-padding {
  padding: 6rem 0;
}
.section-header {
  text-align: center;
  margin-bottom: 3rem;
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: $text-primary;
  }
  .divider {
    width: 60px;
    height: 4px;
    background-color: $primary;
    margin: 0 auto;
    border-radius: 2px;
  }
}
.btn {
  display: inline-block;
  padding: 0.75rem 1.75rem;
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
  &.btn-secondary {
    background-color: transparent;
    color: white;
    border-color: white;
    &:hover {
      background-color: white;
      color: $dark-bg;
    }
  }
  &.btn-small {
    padding: 0.5rem 1.2rem;
    font-size: 0.9rem;
  }
}
.card {
  background-color: $dark-card;
  border: 1px solid $dark-border;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
}

// === 3. GAYA PER-SEKSI ===
.hero-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  position: relative;
  background-size: cover;
  background-position: center;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(17, 24, 39, 0.7) 70%,
      rgba(17, 24, 39, 1) 100%
    );
    z-index: 1;
  }
  .hero-content {
    position: relative;
    z-index: 2;
    h1 {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 1rem;
      .highlight {
        color: $primary;
      }
    }
    h2 {
      font-size: 1.5rem;
      font-weight: 400;
      color: $text-secondary;
      margin-bottom: 2rem;
    }
    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
  }
}
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
  margin: 0 auto;
}
.skill-card {
  padding: 2.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  &:hover {
    border-color: $primary;
  }
  .skill-icon {
    font-size: 3rem;
    color: $primary;
    margin-bottom: 0.5rem;
  }
  .skill-name {
    font-size: 1rem;
    font-weight: 500;
    color: $text-primary;
    margin: 0;
  }
}

.features-section {
  .section-subtitle {
    color: $text-secondary;
    font-size: 1.1rem;
    max-width: 600px;
    margin: 1rem auto 0 auto;
  }
  .features-list {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 5rem;
  }
  .feature-item {
    display: grid;
    // Default layout untuk mobile: 1 kolom
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: center;

    .feature-content {
      // Teks selalu di bawah gambar secara default
      order: 2;
    }
    .feature-image {
      // Gambar selalu di atas teks secara default
      order: 1;
    }
  }
  .feature-image img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    aspect-ratio: 16 / 11;
    object-fit: cover;
  }
  .feature-content {
    h3 {
      font-size: 2rem;
      color: $text-primary;
      margin-bottom: 1.5rem;
    }
    p {
      color: $text-secondary;
      line-height: 1.8;
      margin-bottom: 2rem;
    }
    .feature-icon {
      font-size: 2rem;
      color: $primary;
      margin-bottom: 1rem;
    }
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}
.project-card {
  padding: 0;
  overflow: hidden;
  position: relative;
  aspect-ratio: 16 / 9;
  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease-out;
  }
  .project-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(17, 24, 39, 0.95) 0%,
      transparent 60%
    );
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    opacity: 0;
    transform: translateY(15px);
    transition: all 0.3s ease-in-out;
    .project-category {
      color: $text-secondary;
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
    }
    .project-title {
      font-size: 1.5rem;
      color: $text-primary;
      margin-bottom: 0;
    }
  }
  &:hover {
    .project-image {
      transform: scale(1.05);
    }
    .project-overlay {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
.view-all {
  text-align: center;
}

// --- REVISI TOTAL: Testimonials Section ---
.testimonials-section {
  position: relative;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba($dark-bg, 0.8);
    backdrop-filter: blur(3px);
  }
  .container {
    position: relative;
    z-index: 2;
    color: white;
  }
}
.testimonial-content-wrapper {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}
.testimonial-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.testimonial-author-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid $primary;
  margin-bottom: 1.5rem;
}
.testimonial-author-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: $text-primary;
  margin: 0;
}
.testimonial-author-title {
  color: $text-secondary;
  margin-bottom: 1rem;
}
.star-rating {
  display: flex;
  gap: 0.25rem;
  color: $dark-border;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  i.active {
    color: $star-color;
  }
}
.testimonial-quote {
  font-size: 1.2rem;
  font-style: italic;
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto;
  color: $text-secondary;
}
.testimonial-pagination {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2.5rem;
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: $dark-border;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    &.active {
      background-color: $primary;
      transform: scale(1.2);
    }
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

// --- Footer & Scroll-to-Top ---
.site-footer {
  background-color: $dark-card;
  padding: 4rem 0 2rem 0;
  text-align: center;
  border-top: 1px solid $dark-border;
  .footer-cta {
    margin-bottom: 3rem;
    h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }
  }
  .footer-tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 2rem;
    margin: 0 auto 3rem auto;
    align-items: center;
  }
  .tech-logo img {
    max-height: 40px;
    width: auto;
    opacity: 0.6;
    filter: grayscale(100%);
    transition: all 0.3s ease;
    &:hover {
      opacity: 1;
      filter: none;
      transform: scale(1.05);
    }
  }
  .footer-bottom {
    border-top: 1px solid $dark-border;
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  .footer-logo {
    font-size: 1.5rem;
    font-weight: 700;
  }
  .footer-copyright {
    font-size: 0.875rem;
    color: $text-secondary;
  }
}
.scroll-to-top {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: $primary;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: all 0.3s ease;
  &:hover {
    background-color: color.adjust($primary, $lightness: -8%);
    transform: translateY(-3px);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// === 4. RESPONSIVE STYLES (DIORGANISIR ULANG) ===
@media (min-width: 768px) {
  .features-section .feature-item {
    // Ubah menjadi 2 kolom
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    text-align: left;

    // Reset urutan agar mengikuti alur grid
    .feature-image,
    .feature-content {
      order: initial;
    }

    // Atur item pertama: gambar kiri, teks kanan
    .feature-image {
      grid-column: 1 / 2;
    }
    .feature-content {
      grid-column: 2 / 3;
    }

    // Aturan untuk item yang dibalik
    &.reverse {
      .feature-image {
        grid-column: 2 / 3; // Gambar pindah ke kanan
      }
      .feature-content {
        grid-column: 1 / 2; // Teks pindah ke kiri
      }
    }
  }
}

// Sesuaikan font size di mobile jika perlu
@media (max-width: 767px) {
  .features-section .feature-item {
    text-align: center;
  }
  .features-section .feature-content h3 {
    font-size: 1.8rem;
  }
}

@media (max-width: 768px) {
  .section-padding {
    padding: 4rem 0;
  }

  .hero-section .hero-content {
    h1 {
      font-size: 2.5rem;
    }
    h2 {
      font-size: 1.25rem;
    }
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .testimonial-quote {
    font-size: 1.1rem;
  }

  .site-footer .footer-cta h2 {
    font-size: 1.5rem;
  }

  .site-footer .footer-tech-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  // REVISI: Ukuran dan posisi tombol scroll-to-top di mobile
  .scroll-to-top {
    width: 45px;
    height: 45px;
    font-size: 1rem;
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
