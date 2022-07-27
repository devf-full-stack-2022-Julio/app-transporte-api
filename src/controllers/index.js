const managers = require('../managers')
const utils = require('../utils');

async function userLogin(req, res) {
  const { email, password } = req.body

  // Validar data
  if (!email) return res.status(400).json({ message: 'missing email in body'})
  if (!password) return res.status(400).json({ message: 'missing password in body'})

  let loggedUser = null
  try {
    loggedUser = await managers.users.login(email, password)
  } catch(err) {
      return res.status(402).json({ message: err.message })
  }

  // Generar una llave de sesión
  const sessionToken = utils.generateToken(loggedUser.email, loggedUser.password)

  delete loggedUser.dataValues.password
  return res.status(200).json({ token: sessionToken, user: loggedUser })
}

async function userRegister(req, res) {
  const { email, password } = req.body

  // Validar data
  if (!email) return res.status(400).json({ message: 'missing email in body'})
  if (!password) return res.status(400).json({ message: 'missing password in body'})

  let createdUser = null
  try {
    createdUser = await managers.users.create(email, password)
  } catch(err) {
      if(err.name === 'SequelizeUniqueConstraintError') {
        return res.status(403).json({ message: 'El usuario ya existe'})
      }
      return res.status(403).json({ message: err.message })
  }

  return res.status(200).json(createdUser)
}

function userInfo(req, res) {
  const user = req.user
  if (!user) throw new Error('missing user in req')

  res.status(200).json({ email: user.email });
}

module.exports = {
  users: {
    login: userLogin,
    register: userRegister,
    getInfo: userInfo
  }
}