const express = require('express')
const router = express.Router()

const { users } = require('../controllers')
const middlewares = require('../middlewares')


router.get('/', (req, res) => res.send('Hola desde nuestra app 🚀'))

/* Users */
router.post('/signup', users.register)
router.post('/login', users.login)
router.get('/user/info', middlewares.authorization, users.getInfo);

module.exports = router;