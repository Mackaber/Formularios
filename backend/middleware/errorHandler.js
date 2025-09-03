
const errorHanlder = (err, req, res, next) => {
    console.error(err.message);

    res.status(500).json({ error: `Ocurrió un error en el servidor: ${err.message}`})
}

module.exports = errorHanlder