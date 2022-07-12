const managers = require('../managers')

function userLogin(req, res) {

  res.send('login controller')
}

function userRegister(req, res) {
  const { email, password } = req.body

  let createdUser = null
  try {
    createdUser = managers.users.create(email, password)
  } catch(err) {
      return res.status(402).json({ message: err.message })
  }

  return res.status(200).json(createdUser)
}

// /users?search="misa"

module.exports = {
  users: {
    login: userLogin,
    register: userRegister 
  }
}