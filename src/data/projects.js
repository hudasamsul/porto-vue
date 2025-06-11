import { ref } from "vue";

export const allProjects = ref([
  {
    id: 1,
    title: "E-commerce Website",
    category: "Web Development",
    image: new URL("@/assets/project1.jpg", import.meta.url).href,
    description:
      "A full-featured e-commerce platform built with Vue.js and a Node.js backend.",
    longDescription:
      "The main challenge was to create a seamless user experience, from browsing to checkout. We used an agile methodology, focusing on key features like product search, user authentication, and a responsive checkout flow.",
    technologies: ["Vue.js", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/your-repo",
    details: {
      client: "A Fictional Startup",
      year: "2024",
      technologies: ["Vue.js", "SCSS", "Vue Router", "Figma"],
    },
  },
  {
    id: 2,
    title: "Mobile App UI",
    category: "UI Design",
    image: new URL("@/assets/project2.jpg", import.meta.url).href,
    description:
      "A comprehensive UI/UX design project for a fitness mobile app.",
    longDescription:
      "The goal was to create an engaging and motivating experience. The color palette, typography, and iconography were carefully chosen to reflect a modern and energetic brand.",
    technologies: ["Figma", "Adobe XD", "User Research"],
    liveUrl: "#",
    githubUrl: "#",
    details: {
      client: "Fitness App Co.",
      year: "2023",
      technologies: ["Figma", "Adobe XD", "Sketch"],
    },
  },
  {
    id: 3,
    title: "Company Dashboard",
    category: "Web Application",
    image: new URL("@/assets/project3.jpg", import.meta.url).href,
    description:
      "An internal dashboard for a tech company to visualize sales data and track KPIs.",
    longDescription:
      "A key feature is the real-time data update via WebSockets, ensuring managers have the most current information at their fingertips.",
    technologies: ["Vue.js", "Chart.js", "SCSS", "REST API"],
    liveUrl: "#",
    githubUrl: "#",
    details: {
      client: "Tech Solutions Inc.",
      year: "2023",
      technologies: ["Vue.js", "Chart.js", "SCSS", "REST API"],
    },
  },
  //  menambahkan lebih banyak proyek di sini
]);
