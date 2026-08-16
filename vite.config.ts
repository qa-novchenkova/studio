import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: '/studio/' — GitHub Pages отдаёт сайт из подпапки с именем репозитория.
export default defineConfig({
  base: '/studio/',
  plugins: [react(), tailwindcss()],
})
