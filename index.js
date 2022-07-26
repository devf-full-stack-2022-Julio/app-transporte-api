require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const PORT = 8000

const apiRoutes = require('./src/routes')
require('./src/services/sequelize')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  // console.log(`Se solicitó la ruta ${req.url} con el metodo HTTP ${req.method}`);
  next()
})
app.use(morgan('tiny'))

app.use('/api', apiRoutes)

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo exitosamente en http://localhost:${PORT} 🚀`)
})
