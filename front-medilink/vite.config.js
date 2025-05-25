import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Define alias para facilitar las importaciones
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@services': resolve(__dirname, 'src/services'),
      '@context': resolve(__dirname, 'src/context'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@config': resolve(__dirname, 'src/config')
    }
  },
  build: {
    // Configuración para manejar errores durante la compilación
    minify: 'terser',
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignorar warnings específicos que pueden causar problemas
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
        if (warning.code === 'CIRCULAR_DEPENDENCY') return
        warn(warning)
      },
    }
  },
  // Configuración para desarrollo
  server: {
    port: 4200,
    open: true
  }
})
