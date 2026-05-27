import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { exec } from 'child_process'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'send-emails-api',
      configureServer(server) {
        server.middlewares.use('/api/send-emails', (req, res) => {
          if (req.method !== 'POST') {
            res.writeHead(405).end('Method Not Allowed')
            return
          }
          exec(
            'python3 /Users/ayalagazinsky/Downloads/send_email.py',
            { cwd: '/Users/ayalagazinsky/Downloads' },
            (error, stdout, stderr) => {
              if (error) {
                console.error('[send-emails] error:', stderr || error.message)
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ ok: false, error: error.message }))
              } else {
                console.log('[send-emails] done:\n', stdout)
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ ok: true }))
              }
            }
          )
        })
      },
    },
  ],
})
