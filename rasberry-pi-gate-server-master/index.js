const express = require('express')
const cors = require('cors')

const gate = require('./gate')
const led = require('./led')

const PORT = 8000
const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// server endpoints
app.post('/', (req, res) => {
  if (req.body.command == 'open-gate') {
    gate.open()
    res.send({ msg: 'Opening barrier' })
  } else {
    res.status(400)
    res.send({ msg: 'Error' })
  }
})

// start server
const server = app.listen(PORT, () => {
  console.log(`Server started. Listening at http://localhost:${PORT}`)
})

// Do graceful shutdown
function shutdown() {
  // close express
  server.close()
  // free resource
  led.unexport()
}

//catches ctrl+c event
process.on('SIGINT', () => shutdown())
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', () => shutdown())
process.on('SIGUSR2', () => shutdown())
