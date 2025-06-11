// src/composables/useTextScramble.js

import { ref } from "vue";

export function useTextScramble() {
  const output = ref("");
  const chars = "eJIDwrewyroioihdsk";
  let frameRequest;
  let frame;
  let queue = [];
  let resolvePromise;

  const setText = (newText) => {
    const oldText = output.value;
    const length = Math.max(oldText.length, newText.length);

    // Batalkan animasi sebelumnya jika ada
    cancelAnimationFrame(frameRequest);

    const promise = new Promise((resolve) => (resolvePromise = resolve));

    queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40); // Awal acak untuk setiap huruf
      const end = start + Math.floor(Math.random() * 40); // Akhir acak untuk setiap huruf
      queue.push({ from, to, start, end, char: "" });
    }

    frame = 0;
    update();
    return promise;
  };

  const update = () => {
    let newOutput = "";
    let complete = 0;

    for (let i = 0; i < queue.length; i++) {
      let { from, to, start, end, char } = queue[i];

      if (frame >= end) {
        complete++;
        newOutput += to;
      } else if (frame >= start) {
        // Jika masih dalam periode acak
        if (!char || Math.random() < 0.28) {
          char = chars[Math.floor(Math.random() * chars.length)];
          queue[i].char = char;
        }
        newOutput += `<span class="scramble-char">${char}</span>`;
      } else {
        newOutput += from;
      }
    }

    output.value = newOutput;

    if (complete === queue.length) {
      resolvePromise(true); // Animasi selesai
    } else {
      frameRequest = requestAnimationFrame(update);
      frame++;
    }
  };

  return {
    scrambledText: output,
    setText,
  };
}
