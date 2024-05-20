import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port:8080
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "assets": `${path.resolve(__dirname, "./src/assets/")}`,
      "components": `${path.resolve(__dirname, "./src/components/")}`,
      "hooks": `${path.resolve(__dirname, "./src/hooks/")}`,
      "interfaces": `${path.resolve(__dirname, "./src/interfaces/")}`
    }
  }
})
