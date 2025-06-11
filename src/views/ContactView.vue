<script setup>
import { ref } from "vue";
import { useHead } from "@vueuse/head";
import axios from "axios"; // Kita akan gunakan axios untuk mengirim data

// --- State Reaktif ---
const formData = ref({
  name: "",
  email: "",
  message: "",
});

const formStatus = ref({
  submitting: false,
  success: false,
  error: null,
});

// --- Informasi Kontak Anda ---
const contactDetails = [
  {
    icon: "fas fa-envelope",
    label: "Email",
    value: "samsulaja1804@gmail.com",
    href: "mailto:samsulaja1804@gmail.com",
  },
  {
    icon: "fab fa-linkedin",
    label: "LinkedIn",
    value: "samsul-huda",
    href: "https://linkedin.com/in/samsul-huda-profile",
  }, // Ganti dengan URL LinkedIn Anda
  {
    icon: "fab fa-github",
    label: "GitHub",
    value: "samsulhuda18",
    href: "https://github.com/samsulhuda18",
  }, // Ganti dengan URL GitHub Anda
];

// --- Fungsi untuk Submit Form ---
const handleSubmit = async () => {
  formStatus.value = { submitting: true, success: false, error: null };

  try {
    // GANTI DENGAN ENDPOINT FORMSPREE ANDA
    const formspreeEndpoint = "https://formspree.io/f/xpwrdzna";

    await axios.post(formspreeEndpoint, formData.value, {
      headers: { Accept: "application/json" },
    });

    formStatus.value.success = true;
    // Kosongkan form setelah berhasil
    formData.value = { name: "", email: "", message: "" };
  } catch (error) {
    console.error("Form submission error:", error);
    formStatus.value.error =
      "Sorry, there was an error sending your message. Please try again later.";
  } finally {
    formStatus.value.submitting = false;
  }
};

useHead({
  title: 'Samsul Huda | Frontend Developer & UI Designer',
  meta: [
    { name: 'description', content: 'Portofolio pribadi Samsul Huda, seorang frontend developer yang bersemangat dalam membangun web experience yang indah dan responsif.' },
  ],
})
</script>

<template>
  <main class="contact-view">
    <div class="container">
      <!-- Header Halaman -->
      <header class="page-header" data-aos="fade-up">
        <h1>Get In Touch</h1>
        <p class="subtitle">
          I'm currently available for freelance work and open to discussing new
          projects.
        </p>
        <div class="divider"></div>
      </header>

      <!-- Layout Utama -->
      <div class="contact-content">
        <!-- Kolom Kiri: Info Kontak -->
        <div class="contact-info" data-aos="fade-right">
          <h3>Contact Information</h3>
          <p>
            Fill up the form and I will get back to you within 24 hours. Or find
            me through my other channels:
          </p>
          <ul class="info-list">
            <li v-for="detail in contactDetails" :key="detail.label">
              <a :href="detail.href" target="_blank" rel="noopener noreferrer">
                <i :class="detail.icon"></i>
                <span>{{ detail.value }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Kolom Kanan: Form -->
        <div class="contact-form" data-aos="fade-left" data-aos-delay="100">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Your Name</label>
              <!-- PERBAIKAN: Tambahkan autocomplete="name" -->
              <input
                type="text"
                id="name"
                v-model="formData.name"
                required
                placeholder="John Doe"
                autocomplete="name"
              />
            </div>
            <div class="form-group">
              <label for="email">Your Email</label>
              <!-- PERBAIKAN: Tambahkan autocomplete="email" -->
              <input
                type="email"
                id="email"
                v-model="formData.email"
                required
                placeholder="john.doe@example.com"
                autocomplete="email"
              />
            </div>
            <div class="form-group">
              <label for="message">Your Message</label>
              <!-- PERBAIKAN: Gunakan autocomplete="off" untuk textarea agar tidak ada saran aneh -->
              <textarea
                id="message"
                v-model="formData.message"
                rows="5"
                required
                placeholder="Hello, I'd like to discuss a project..."
                autocomplete="off"
              ></textarea>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="formStatus.submitting"
            >
              <span v-if="formStatus.submitting">Sending...</span>
              <span v-else>Send Message</span>
            </button>
          </form>
          <!-- Tampilkan pesan status -->
          <div v-if="formStatus.success" class="form-message success">
            Thank you! Your message has been sent successfully.
          </div>
          <div v-if="formStatus.error" class="form-message error">
            {{ formStatus.error }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use "sass:color";
// Variabel warna
$primary: #f05922;
$dark-bg: #111827;
$dark-card: #1f2937;
$dark-border: #374151;
$text-primary: #f9fafb;
$text-secondary: #9ca3af;
$success-color: #10b981;
$error-color: #ef4444;

.contact-view {
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

// Header Halaman (mirip AboutView)
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
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  .divider {
    width: 80px;
    height: 4px;
    background-color: $primary;
    margin: 0 auto;
    border-radius: 2px;
  }
}

// Layout utama
.contact-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1.5fr; // Kolom form lebih besar
    gap: 4rem;
  }
}

// Kolom Info Kontak
.contact-info {
  h3 {
    font-size: 1.75rem;
    color: $text-primary;
    margin-bottom: 1rem;
  }
  p {
    color: $text-secondary;
    line-height: 1.7;
    margin-bottom: 2rem;
  }
  .info-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    li a {
      color: $text-secondary;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: color 0.3s ease;
      &:hover {
        color: $primary;
      }
      i {
        font-size: 1.5rem;
        width: 25px; // Agar ikon sejajar
        text-align: center;
      }
      span {
        font-weight: 500;
      }
    }
  }
}

// Kolom Form
.contact-form {
  background-color: $dark-card;
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid $dark-border;
}

.form-group {
  margin-bottom: 1.5rem;
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: $text-secondary;
    font-weight: 500;
  }
  input,
  textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    background-color: $dark-bg;
    border: 1px solid $dark-border;
    border-radius: 8px;
    color: $text-primary;
    font-size: 1rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    &:focus {
      outline: none;
      border-color: $primary;
      box-shadow: 0 0 0 3px rgba($primary, 0.3);
    }
  }
  textarea {
    resize: vertical;
  }
}

.btn {
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1.1rem;
  // ... gaya tombol lainnya ...
  display: inline-block;
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
    &:disabled {
      background-color: color.adjust($primary, $lightness: 10%, $alpha: -0.3);
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
}

.form-message {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  &.success {
    background-color: rgba($success-color, 0.1);
    color: $success-color;
  }
  &.error {
    background-color: rgba($error-color, 0.1);
    color: $error-color;
  }
}
</style>
