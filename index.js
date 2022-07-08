const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hola desde nuestra app 🚀')
})

app.post('/signup', (req, res) => {
  res.send('Endpoint para registro alcanzado 🔥')
});

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo exitosamente en http://localhost:${PORT} 🚀`)
})
