const managers = require('../managers')

function userLogin(req, res) {
  const { email, password } = req.body

  let loggedUser = null
  try {
    loggedUser = managers.users.login(email, password)
  } catch(err) {
      return res.status(402).json({ message: err.message })
  }

  return res.status(200).json(loggedUser)
}

function userRegister(req, res) {
  const { email, password } = req.body

  let createdUser = null
  try {
    createdUser = managers.users.create(email, password)
  } catch(err) {
      return res.status(403).json({ message: err.message })
  }

  return res.status(200).json(createdUser)
}

module.exports = {
  users: {
    login: userLogin,
    register: userRegister 
  }
}