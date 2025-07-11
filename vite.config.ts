import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/boothiecal_playground/',
  plugins: [react()],
})
