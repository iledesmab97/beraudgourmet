require('dotenv').config({ path: '.env.local'})
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { initDB } = require("./db")

const dev = process.env.NODE_ENV !== "production"
const hostname = process.env.SERVER_HOSTNAME
const port = process.env.SERVER_PORT

async function bootstap() {
    
    await initDB()
    const app = next({ dev, hostname, port })
    const handle = app.getRequestHandler()

    app.prepare().then(() => {
        createServer(async (req, res) => {
            try {
                const parsedUrl = parse(req.url, true)
                handle(req, res, parsedUrl)
            } catch(error) {
                console.error('Error occurred handling', req.url, error)
                res.statusCode = 500
                res.end('internal server error')
            }
        })
            .once('error', error => {
                console.error(error)
                process.exit(1)
            })
            .listen(port, () => {
                console.log(`> Server listening at http://${hostname}:${port} as ${dev ? 'development' : process.env.NODE_ENV}`)
            })
    })
}

bootstap()