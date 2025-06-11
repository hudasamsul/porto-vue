
<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { useHead } from "@vueuse/head";
import { allProjects } from "@/data/projects.js";

const activeCategory = ref("All");

const categories = computed(() => {
  const uniqueCategories = new Set(allProjects.value.map((p) => p.category));
  return ["All", ...uniqueCategories];
});

const filteredProjects = computed(() => {
  if (activeCategory.value === "All") {
    return allProjects.value;
  }
  return allProjects.value.filter((p) => p.category === activeCategory.value);
});

const setCategory = (category) => {
  activeCategory.value = category;
};

useHead({ title: "My Projects | Samsul Huda" });
</script>

<template>
  <main class="projects-view">
    <section class="page-header" data-aos="fade-up">
      <div class="container">
        <h1>My Projects</h1>
        <p>
          A collection of my work, from web applications to user interface
          designs.
        </p>
      </div>
    </section>

    <section class="filter-section" data-aos="fade-up" data-aos-delay="100">
      <div class="container">
        <div class="filter-buttons">
          <button
            v-for="category in categories"
            :key="category"
            @click="setCategory(category)"
            class="filter-btn"
            :class="{ active: category === activeCategory }"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>

    <section class="projects-grid-section">
      <div class="container">
        <TransitionGroup name="card-fade" tag="div" class="projects-grid">
          <RouterLink
            v-for="project in filteredProjects"
            :key="project.id"
            :to="`/projects/${project.id}`"
            class="project-card"
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
            </div>
          </RouterLink>
        </TransitionGroup>
      </div>
    </section>
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

.projects-view {
  background-color: $dark-bg;
  padding-top: 120px;
  padding-bottom: 6rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    color: $text-primary;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.1rem;
    color: $text-secondary;
    max-width: 600px;
    margin: 0 auto;
  }
}

.filter-section {
  margin-bottom: 3rem;
}
.filter-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.filter-btn {
  background-color: $dark-card;
  color: $text-secondary;
  border: 1px solid $dark-border;
  padding: 0.6rem 1.25rem;
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: color.adjust($dark-card, $lightness: 5%);
    color: $text-primary;
  }
  &.active {
    background-color: $primary;
    border-color: $primary;
    color: white;
    box-shadow: 0 4px 15px rgba($primary, 0.3);
  }
}

.projects-grid-section {
  padding-top: 1rem;
}

.projects-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.project-card {
  background-color: $dark-card;
  border: 1px solid $dark-border;
  border-radius: 12px;
  padding: 0;
  overflow: hidden;
  position: relative;
  display: block;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  width: 100%;

  @media (min-width: 640px) {
    width: calc(50% - 1rem);
  }
  @media (min-width: 1024px) {
    width: calc(33.333% - 1.34rem);
  }
  @media (min-width: 1200px) {
    max-width: 350px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    .project-image {
      transform: scale(1.05);
    }
    .project-overlay {
      opacity: 1;
    }
  }

  .project-image {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
  .project-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(17, 24, 39, 0.95) 0%,
      transparent 70%
    );
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    opacity: 0;
    transition: opacity 0.4s ease;
    .project-category {
      color: $text-secondary;
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
    }
    .project-title {
      font-size: 1.5rem;
      color: $text-primary;
      margin: 0;
    }
  }
}

.card-fade-move,
.card-fade-enter-active,
.card-fade-leave-active {
  transition: all 0.4s ease;
}
.card-fade-enter-from,
.card-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.card-fade-leave-active {
  position: absolute;
}
</style>