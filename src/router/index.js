// BAGIAN 1 SUDAH DIUBAH DI SINI
import { createRouter, createWebHashHistory } from "vue-router";
// Kita impor komponen Home secara langsung karena ini halaman pertama
import Home from "@/views/HomeView.vue";
import About from "@/views/AboutView.vue";
import UtilityView from "@/views/UtilityView.vue";

// Ini adalah daftar semua "jalan" atau halaman di website Anda
const routes = [
  // Jalan ke Halaman Utama
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  // Jalan ke Halaman "About"
  {
    path: "/about",
    name: "About",
    // Komponen dimuat saat dibutuhkan (lazy loading) untuk performa lebih baik
    component: () => import("@/views/AboutView.vue"),
  },

  // Jalan ke Halaman "Contact"
  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/views/ContactView.vue"),
  },

  // Jalan ke Halaman Galeri Semua Proyek
  {
    path: "/projects",
    name: "Projects",
    component: () => import("@/views/ProjectsViews.vue"),
  },

  // Jalan ke Halaman Detail Satu Proyek
  {
    path: "/projects/:id", // :id adalah placeholder, bisa diisi dengan angka apa saja
    name: "ProjectDetail",
    component: () => import("@/views/ProjectsDetail.vue"),
  },

  {
    path: "/coming-soon",
    name: "coming-soon",
    component: UtilityView,
    props: (route) => ({ mode: "construction" }), // Kirim prop mode
  },
  {
    path: "/blog",
    name: "blog",
    component: UtilityView,
    props: { mode: "construction" }, // Selalu kirim mode 'construction'
  },

  // Rute "Catch-all" untuk 404, HARUS DI PALING BAWAH
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: UtilityView,
    props: (route) => ({ mode: "404" }), // Kirim prop mode
  },
];

// Membuat instance router dengan konfigurasi
const router = createRouter({
  // BAGIAN 2 SUDAH DIUBAH DI SINI
  history: createWebHashHistory(), // Menggunakan mode Hash untuk GitHub Pages
  routes, // Menggunakan daftar jalan yang sudah kita definisikan
  scrollBehavior(to, from, savedPosition) {
    // Jika ada hash di URL tujuan (misal: /#skills)
    if (savedPosition) {
      return savedPosition;
    }
    // 2. Jika ada hash di URL tujuan (misal: /#skills)
    if (to.hash) {
      // Kembalikan selector-nya, biarkan Vue Router yang mencoba mencarinya.
      // Ini lebih andal daripada setTimeout manual.
      return {
        el: to.hash,
        behavior: "smooth",
        top: 80, // Tambahkan offset agar tidak tertutup navbar (sesuaikan nilainya)
      };
    }

    // Default: scroll ke puncak halaman
    return { top: 0 };
  },
  // -------------------------
});

export default router;
