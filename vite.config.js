import path from 'path'
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'production',
    }
  },
  build: {
    minify: false,
    outDir: 'public',
    lib: {
      entry: path.resolve(__dirname, 'resources/js/app.js'),
      name: 'App',
      fileName: (format) => `app.${format}.js`,
    },
    rollupOptions: {
      // input: {
      //   main: path.resolve(__dirname, "resources/js/app.js")
      // },
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue({
    template: {
      compilerOptions: {
        compatConfig: {
          MODE: 2
        }
      }
    }
  })],
  resolve: {
    alias: {
      // vue: '@vue/compat',
      '@antfusion': path.resolve(__dirname, 'resources/js'),
      '@': path.resolve(__dirname, '../../fusioncms/cms/resources/js'),
    },
  },
});