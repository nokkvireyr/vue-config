import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import packageJson from './package.json' assert { type: 'json' };
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      fileName: 'main',
      formats: ['es'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        ...Object.keys(packageJson.peerDependencies).map((key) => new RegExp(`/${key}\/.*/`)),
        ...Object.keys(packageJson.peerDependencies),
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          'vue-i18n': 'VueI18n',
        },
      },
    },
  },
});
