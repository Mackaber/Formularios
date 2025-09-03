const express = require('express')
const PORT = 3000

const server = express()
server.use(express.json()) // middleware

server.post('/register', (req, res) => {
    const obj = req.body
    res.send(obj)
})

server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})