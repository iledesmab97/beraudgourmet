require('dotenv').config({ path: '.env.local'})
const server = require('./server/server')
const next = require('next')
const { initDB } = require("./server/db")
const {createRoles, createRoot} = require('./server/libs/initialSetUp')

const dev = process.env.NODE_ENV !== "production"
const hostname = process.env.SERVER_HOSTNAME
const port = process.env.SERVER_PORT

async function bootstap() {
    
    await initDB()
    const app = dev ? next({ dev, hostname, port }) : next({ dev, hostname })
    const handle = app.getRequestHandler()

    app.prepare().then(() => {

        server.get('*', (req, res) => {
            return handle(req, res)
        })
        createRoles()
        createRoot()
        server.listen(port, (error) => {
            if (error) throw error
            if (dev) {
                console.log(`> Server listening at http://${hostname}:${port} as ${dev ? 'development' : process.env.NODE_ENV}`)
            } else {
                console.log(`> Server listening at http://${hostname} as ${dev ? 'development' : process.env.NODE_ENV}`)
            }
        })
    })
}

bootstap()