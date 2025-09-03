const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const { body, validationResult } = require('express-validator')
const cors = require('cors')

const PORT = 3000
const server = express()
server.use(express.json()) // middleware
server.use(cors())

server.post('/register', 
    [
        body('email').isEmail().withMessage('Email inválido'),
        // Password contains at least 6 characters and a uppercase letter
        body('password').isLength({ min: 6 }).withMessage('La contraseña no es valida.\n La contraseña debe contener al menos 6 caracteres'),
        body('password').matches(/.*[A-Z].*/).withMessage('La contraseña no es valida.\n La contraseña debe contener al menos una letra mayúscula')
    ],
    
    (req, res) => {

        //throw({ message: "Terrible error!"})

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        }

        res.status(200).json({response: 'El usuario fue registrado correctamente'})

    //const obj = req.body
    //res.send(obj)

})

server.use(errorHandler)

server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})