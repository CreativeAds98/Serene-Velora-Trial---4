import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        destinations: 'destinations.html',
        holidays: 'holidays.html',
        about: 'about.html',
        contact: 'contact.html',
      },
    },
  },
});
