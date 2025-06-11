// src/utils/eventBus.js
import { reactive } from "vue";

const eventBus = reactive({
  // Kita gunakan Map untuk menyimpan event listener
  listeners: new Map(),

  // Fungsi untuk mengirim event
  emit(event, ...args) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((callback) => callback(...args));
    }
  },

  // Fungsi untuk "mendengarkan" event
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  },

  // Fungsi untuk berhenti mendengarkan
  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  },
});

export default eventBus;
