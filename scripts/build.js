import { build as viteBuild } from 'vite'
import { copyFileSync, mkdirSync } from 'fs'

async function run() {
  try {
    // Run Vite production build
    await viteBuild()

    // Ensure 404.html exists for SPA fallback on GitHub Pages
    mkdirSync('dist', { recursive: true })
    copyFileSync('dist/index.html', 'dist/404.html')

    console.log('Build complete. Wrote dist/ and 404.html')
    process.exit(0)
  } catch (err) {
    console.error('Build failed:', err)
    process.exit(1)
  }
}

run()
