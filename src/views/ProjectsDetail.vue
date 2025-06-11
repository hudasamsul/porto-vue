<script setup>
import { computed, watch } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import { useHead } from "@vueuse/head";
import { allProjects } from "@/data/projects.js";

const route = useRoute();
const router = useRouter();

// Fungsi untuk mendapatkan data proyek berdasarkan ID
const getProjectById = (id) => {
  return allProjects.value.find((p) => p.id === parseInt(id));
};

// State untuk proyek saat ini
const project = computed(() => getProjectById(route.params.id));

// State untuk proyek lainnya (tidak termasuk yang sedang dilihat)
const otherProjects = computed(() => {
  if (!project.value) return [];
  return allProjects.value.filter((p) => p.id !== project.value.id).slice(0, 5); // Ambil 5 lainnya
});

// Mengatur judul tab browser secara dinamis
useHead(
  computed(() => ({
    title: project.value
      ? `${project.value.title} | Project Detail`
      : "Project Not Found",
  }))
);

// PERBAIKAN: Scroll ke atas saat berpindah ke proyek lain
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
);
</script>

<template>
  <main v-if="project" class="project-detail-view">
    <!-- Header Halaman -->
    <section
      v-if="project"
      class="page-header"
      :style="{ backgroundImage: 'url(' + project.image + ')' }"
    >
      <div class="container">
        <h1 data-aos="fade-up">{{ project.title }}</h1>
        <div class="breadcrumbs" data-aos="fade-up" data-aos-delay="100">
          <RouterLink to="/">Home</RouterLink> <span>/</span>
          <RouterLink to="/projects">Projects</RouterLink> <span>/</span>
          <span class="current">{{ project.title }}</span>
        </div>
      </div>
    </section>

    <!-- Konten Detail Proyek -->
    <section class="project-content-section">
      <div class="container">
        <div class="layout-grid">
          <!-- Sidebar -->
          <aside class="sidebar" data-aos="fade-right">
            <!-- Widget Info Proyek -->
            <div class="sidebar-widget">
              <h4>Project Information</h4>
              <ul>
                <li>
                  <strong>Category:</strong> <span>{{ project.category }}</span>
                </li>
                <!-- REVISI: Ambil data dari file proyek -->
                <li>
                  <strong>Client:</strong>
                  <span>{{ project.details.client }}</span>
                </li>
                <li>
                  <strong>Year:</strong> <span>{{ project.details.year }}</span>
                </li>
              </ul>
            </div>

            <!-- REVISI: Widget Teknologi -->
            <div class="sidebar-widget">
              <h4>Technologies Used</h4>
              <div class="tech-tags">
                <span
                  v-for="tech in project.details.technologies"
                  :key="tech"
                  class="tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Widget Proyek Lainnya -->
            <div v-if="otherProjects.length > 0" class="sidebar-widget">
              <h4>Other Projects</h4>
              <ul class="other-projects-list">
                <li v-for="other in otherProjects" :key="other.id">
                  <RouterLink :to="`/projects/${other.id}`">{{
                    other.title
                  }}</RouterLink>
                </li>
              </ul>
            </div>
          </aside>

          <!-- Konten Utama -->
          <div class="main-content" data-aos="fade-up">
            <h2>About The Project</h2>
            <p>{{ project.description }}</p>
            <p v-if="project.longDescription">{{ project.longDescription }}</p>

            <img
              :src="project.image"
              :alt="project.title"
              class="main-project-image"
            />

            <div class="project-links">
              <a
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary"
                :class="{
                  disabled: !project.liveUrl || project.liveUrl === '#',
                }"
              >
                <i class="fas fa-globe"></i> View Live Site
              </a>
              <a
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary"
                :class="{
                  disabled: !project.githubUrl || project.githubUrl === '#',
                }"
              >
                <i class="fab fa-github"></i> View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Tampilan jika proyek tidak ditemukan -->
  <div v-else class="container not-found-state">
    <h2>Project Not Found</h2>
    <p>
      The project you are looking for does not exist. Please check the URL or go
      back to the projects page.
    </p>
    <RouterLink to="/projects" class="btn btn-primary"
      >Back to All Projects</RouterLink
    >
  </div>
</template>

<style lang="scss" scoped>
// Variabel warna
$primary: #f05922;
$dark-bg: #111827;
$dark-card: #1f2937;
$dark-border: #374151;
$text-primary: #f9fafb;
$text-secondary: #9ca3af;

.project-detail-view,
.not-found-state {
  padding-top: 120px;
  padding-bottom: 6rem;
  background-color: $dark-bg;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-header {
  padding: 120px 0 100px 0; // Tambahkan sedikit padding bawah
  text-align: center;
  position: relative;
  background-size: cover;
  background-position: center; // Posisi gambar stabil
  color: white; // Konten berada di lapisan paling atas

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    // Gradien dimulai dari warna background utama dan memudar ke transparan
    background: linear-gradient(
      to top,
      $dark-bg 0%,
      // Mulai dengan warna solid
      rgba($dark-bg, 0.9) 30%,
      // Memudar sedikit
      rgba($dark-bg, 0) 100% // Menjadi transparan sepenuhnya di atas
    );
    height: 60%; // Tinggi gradien adalah 60% dari tinggi header
  }

  // Kontainer untuk teks harus berada di atas gradien
  .container {
    position: relative;
    z-index: 2;
  }

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6); // Shadow agar teks terbaca
  }

  .breadcrumbs {
    margin-top: 1rem;
    font-size: 0.9rem;
    a {
      color: $text-secondary;
      text-decoration: none;
      transition: color 0.3s ease;
      &:hover {
        color: $primary;
      }
    }
    span {
      margin: 0 0.5rem;
      color: $dark-border;
    }
    .current {
      color: white;
      font-weight: 500;
    }
  }
}

@media (max-width: 768px) {
  .page-header {
    min-height: 350px;
    h1 {
      font-size: 2.2rem;
    }
    .blur-strip {
      padding: 2rem 0;
    }
  }
}

// Sisa kode tidak perlu diubah
.project-detail-view,
.not-found-state {
  padding-top: 120px;
  padding-bottom: 6rem;
  background-color: $dark-bg;
}
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.project-content-section {
  padding: 5rem 0;
}
.layout-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 3.5rem;
  align-items: flex-start;
}
.sidebar {
  position: sticky;
  top: 120px;
  .sidebar-widget {
    background-color: $dark-card;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    border: 1px solid $dark-border;
    h4 {
      font-size: 1.2rem;
      color: $text-primary;
      margin: 0 0 1rem 0;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid $dark-border;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: $text-secondary;
        margin-bottom: 0.75rem;
        font-size: 0.95rem;
        gap: 1rem;
        &:last-child {
          margin-bottom: 0;
        }
        strong {
          color: $text-primary;
          font-weight: 500;
          flex-shrink: 0;
        }
        span,
        a {
          text-align: right;
          color: $text-secondary;
          text-decoration: none;
        }
      }
    }
    .other-projects-list li a:hover {
      color: $primary;
    }
    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      .tag {
        background-color: $dark-bg;
        color: $text-secondary;
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        font-size: 0.85rem;
      }
    }
  }
}
.main-content {
  min-width: 0;
  h2 {
    font-size: 1.8rem;
    color: $text-primary;
    margin: 0 0 1.5rem 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid $dark-border;
  }
  p {
    color: $text-secondary;
    line-height: 1.8;
    margin: 0 0 1.5rem 0;
  }
  .main-project-image {
    width: 100%;
    border-radius: 12px;
    margin-top: 1rem;
    margin-bottom: 2.5rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  }
  .project-links {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  color: white;
  transition: all 0.3s;
  &.btn-primary {
    background-color: $primary;
    border: 2px solid $primary;
  }
  &.btn-secondary {
    background-color: transparent;
    border: 2px solid $dark-border;
    &:hover {
      background-color: $dark-border;
    }
  }
  &.disabled {
    opacity: 0.4;
    pointer-events: none;
  }
}
.not-found-state {
  padding-top: 5rem;
  text-align: center;
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  p {
    color: $text-secondary;
    margin-bottom: 2rem;
  }
}
@media (max-width: 992px) {
  .layout-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .sidebar {
    position: static;
    order: 2;
    margin-top: 4rem;
  }
  .main-content {
    h2 {
      border-bottom: none;
      text-align: center;
      &::after {
        content: "";
        display: block;
        width: 80px;
        height: 3px;
        background-color: $primary;
        margin: 1rem auto 0 auto;
        border-radius: 2px;
      }
    }
    .project-links {
      justify-content: center;
    }
  }
}
</style>
