import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        merienda: ["Merienda", "cursive"],
        abril: ["Abril Fatface", "cursive"],
        mono: ["Space Mono", "monospace"],
      },
    },
  },

  plugins: [tailwindcss(), react()],
})
