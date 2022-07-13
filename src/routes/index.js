const express = require('express')
const router = express.Router()

const { users } = require('../controllers')

router.get('/', (req, res) => res.send('Hola desde nuestra app 🚀'))

/* Users */
router.post('/signup', users.register)
router.post('/login', users.login)
router.get('/user/info', (req, res) => res.send('Datos del usaurio'));

module.exports = router;