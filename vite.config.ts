import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import packageJson from './package.json' with { type: 'json' };
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      fileName: 'main',
      formats: ['es'],
    },
    rolldownOptions: {
      external: Object.keys(packageJson.peerDependencies).map(
        (key) => new RegExp(`^${key}(/.*|$)`)
      ),
    },
  },
});
