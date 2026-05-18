import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import packageJson from './package.json' with { type: 'json' };
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        main: resolve(__dirname, 'src/main.ts'),
        oxc: resolve(__dirname, 'src/oxc.ts'),
      },
      formats: ['es'],
    },
    rolldownOptions: {
      external: [
        /^node:.*/,
        ...Object.keys(packageJson.peerDependencies).map(
          (key) => new RegExp(`^${key}(/.*|$)`)
        ),
      ],
    },
  },
});
