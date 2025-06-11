<script setup>
import { ref, watch } from "vue"; // PERBAIKAN 1: Impor 'watch'
import { RouterLink } from "vue-router"; // PERBAIKAN 2: Impor 'RouterLink'
import { useHead } from "@vueuse/head";

// --- Aset & Data ---
const profileImage = ref(new URL("@/assets/samsul.jpg", import.meta.url).href);

// Data Diri - Ganti dengan informasi Anda
const personalDetails = ref([
  { label: "Name", value: "Samsul Huda" },
  { label: "Location", value: "Jakarta, Indonesia" },
  { label: "Email", value: "samsulaja1804@gmail.com" }, // Tip: hapus .com duplikat
  { label: "Availability", value: "Open for freelance" },
]);

// State untuk mengontrol modal lightbox
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
};

// Mencegah scroll di background saat modal terbuka
watch(isModalOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

// Mengatur judul tab browser
useHead({
  title: 'Samsul Huda | Frontend Developer & UI Designer',
  meta: [
    { name: 'description', content: 'Portofolio pribadi Samsul Huda, seorang frontend developer yang bersemangat dalam membangun web experience yang indah dan responsif.' },
  ],
})
</script>

<template>
  <main class="about-view">
    <div class="container">
      <!-- Header Halaman -->
      <header class="page-header" data-aos="fade-up">
        <h1>About Me</h1>
        <p class="subtitle">
          A brief introduction about my journey and passion.
        </p>
        <div class="divider"></div>
      </header>

      <!-- Konten Utama: Foto & Cerita -->
      <div class="about-content">
        <!-- Kolom Kiri: Foto -->
        <div class="about-image" data-aos="fade-right">
          <img
            :src="profileImage"
            alt="Samsul Huda's profile photo"
            @click="openModal"
            class="profile-thumbnail"
          />
        </div>

        <!-- Kolom Kanan: Cerita -->
        <div class="about-text" data-aos="fade-left" data-aos-delay="100">
          <h2>
            I'm Samsul Huda, a Frontend Developer and UI Designer based in
            Indonesia.
          </h2>
          <p>
            My journey into web development began with a fascination for how
            beautiful design and intuitive functionality could come together to
            create amazing digital experiences. I am deeply passionate about
            building interfaces that are not only visually appealing but also a
            joy to use.
          </p>
          <p>
            With a strong foundation in modern frontend technologies like Vue.js
            and a keen eye for design principles, I strive to write clean,
            efficient, and maintainable code. I love tackling complex problems
            and turning them into simple, elegant solutions.
          </p>
          <p>
            Beyond the code, I am a lifelong learner, always exploring new
            technologies and design trends to stay at the forefront of the
            industry.
          </p>
        </div>
      </div>

      <!-- Detail Personal -->
      <section
        class="personal-details-section"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div class="details-grid">
          <div
            v-for="detail in personalDetails"
            :key="detail.label"
            class="detail-item"
          >
            <span class="detail-label">{{ detail.label }}</span>
            <span class="detail-value">{{ detail.value }}</span>
          </div>
        </div>
      </section>

      <!-- Tombol Ajakan (Call to Action) -->
      <div class="about-cta" data-aos="fade-up" data-aos-delay="300">
        <RouterLink to="/projects" class="btn btn-primary"
          >See My Work</RouterLink
        >
        <a href="/path/to/your/cv.pdf" download class="btn btn-secondary"
          >Download CV</a
        >
      </div>
    </div>

    <!-- Lightbox Modal untuk Foto Profil -->
    <Transition name="modal-fade">
      <div v-if="isModalOpen" class="lightbox-modal" @click="closeModal">
        <div class="modal-content" @click.stop>
          <img
            :src="profileImage"
            alt="Samsul Huda's profile photo - full view"
          />
          <button
            @click="closeModal"
            class="close-button"
            aria-label="Close image view"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </Transition>
  </main>
</template>

<style lang="scss" scoped>
@use "sass:color";
// Variabel warna (sudah benar)
$primary: #f05922;
$dark-bg: #111827;
$dark-card: #1f2937;
$dark-border: #374151;
$text-primary: #f9fafb;
$text-secondary: #9ca3af;

// Semua gaya CSS Anda di sini sudah bagus dan tidak perlu diubah.
// ... (Salin semua gaya dari kode yang Anda berikan)
.about-view {
  padding-top: 120px;
  padding-bottom: 6rem;
  background-color: $dark-bg;
  min-height: 100vh;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.page-header {
  text-align: center;
  margin-bottom: 4rem;
  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: $text-primary;
    margin-bottom: 0.5rem;
  }
  .subtitle {
    font-size: 1.2rem;
    color: $text-secondary;
    margin-bottom: 1.5rem;
  }
  .divider {
    width: 80px;
    height: 4px;
    background-color: $primary;
    margin: 0 auto;
    border-radius: 2px;
  }
}
.about-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
    align-items: flex-start;
    gap: 4rem;
  }
}
.about-image {
  .profile-thumbnail {
    width: 100%;
    max-width: 300px;
    border-radius: 12px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    margin: 0 auto;
    border: 3px solid $dark-border;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
  }
}
.about-text {
  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    color: $text-primary;
    margin-bottom: 1.5rem;
    line-height: 1.4;
  }
  p {
    color: $text-secondary;
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.personal-details-section {
  background-color: $dark-card;
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid $dark-border;
  margin-bottom: 3rem;
  .details-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
  }
  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .detail-label {
    font-size: 0.9rem;
    color: $text-secondary;
    font-weight: 500;
  }
  .detail-value {
    font-size: 1.1rem;
    color: $text-primary;
    font-weight: 600;
  }
}
.about-cta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
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
      transform: translateY(-2px);
    }
  }
  &.btn-secondary {
    background-color: transparent;
    color: $text-primary;
    border-color: $dark-border;
    &:hover {
      background-color: $dark-border;
    }
  }
}

// Ganti dengan kode ini
.lightbox-modal {
  position: fixed;
  inset: 0; // Cara modern untuk top/left/bottom/right: 0
  background-color: rgba(17, 24, 39, 0.85);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  justify-content: center;
  // align-items: flex-start; // Kita pakai flex-start agar scroll dimulai dari atas
  align-items: center; // align-items: center lebih baik untuk kasus ini
  padding: 2rem; // Beri padding agar konten tidak menempel
  overflow-y: auto; // <-- KUNCI PERBAIKAN: Aktifkan scroll vertikal jika perlu
}

.modal-content {
  position: relative;
  width: 100%;
  max-width: 700px; // Batasi lebar maksimum konten modal
  margin: auto; // Trik agar selalu di tengah secara vertikal & horizontal
  
  img {
    display: block;
    width: 100%; // Biarkan gambar mengisi lebar kontainer modal
    height: auto; // Tinggi otomatis agar proporsional
    border-radius: 12px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  }
}

// Tombol close tetap sama, tapi kita sesuaikan posisinya
.close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(31, 41, 55, 0.7); // Sedikit transparan
  color: white;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: $primary;
    transform: scale(1.1);
  }

  // Pindahkan ke luar gambar di layar besar agar tidak menutupi
  @media (min-width: 768px) {
    top: -15px;
    right: -15px;
    background-color: $primary;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .modal-content,
.modal-fade-leave-active .modal-content {
  transition: transform 0.3s ease;
}
.modal-fade-enter-from .modal-content {
  transform: scale(0.9);
}
.modal-fade-leave-to .modal-content {
  transform: scale(0.9);
}
</style>
