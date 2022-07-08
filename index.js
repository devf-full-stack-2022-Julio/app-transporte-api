const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = 3000

app.use((req, res, next) => {
  console.log(`Se solicitó la ruta ${req.url} con el metodo HTTP ${req.method}`);
  next()
})
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('Hola desde nuestra app 🚀')
})

app.post('/signup', (req, res) => {
  res.send('Endpoint para registro alcanzado 🔥')
});

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo exitosamente en http://localhost:${PORT} 🚀`)
})
