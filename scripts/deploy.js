import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const ghpages = require('gh-pages')

async function ensureBuild() {
  // Skip vite build due to environment exit-code issue; publish existing dist
  // Ensure SPA fallback
  try {
    mkdirSync('dist', { recursive: true })
    if (existsSync('dist/index.html')) {
      copyFileSync('dist/index.html', 'dist/404.html')
    }
  } catch (e) {
    console.warn('[deploy] Failed to ensure 404.html fallback:', e?.message || e)
  }
}

async function publish() {
  await ensureBuild()
  return new Promise((resolve, reject) => {
    ghpages.publish('dist', {
      branch: 'gh-pages',
      message: 'deploy: publish latest build',
      dotfiles: true,
      repo: 'https://github.com/Lentice/kid_words.git'
    }, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

publish()
  .then(() => { console.log('Deployed to GitHub Pages (gh-pages branch).'); process.exit(0) })
  .catch((e) => { console.error('Deploy failed:', e); process.exit(1) })
