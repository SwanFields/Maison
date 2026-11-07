import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins = [react()]

  // `npm run dev` / `npm run build` use the Base44 plugin (needed by `base44 dev`).
  // `npm run dev:local` (mode "local") skips it so the app runs standalone in VS Code.
  if (mode !== 'standalone') {
    const { default: base44 } = await import('@base44/vite-plugin')
    plugins.unshift(
      base44({
        legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
        hmrNotifier: true,
        navigationNotifier: true,
        analyticsTracker: true,
        visualEditAgent: true,
      })
    )
  }

  return {
    plugins,
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
  }
})
