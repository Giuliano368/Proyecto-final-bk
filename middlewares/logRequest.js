const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] - Solicitud ${req.method} recibida al endpoint ${req.url}`)
    next()
}

module.exports = logRequest