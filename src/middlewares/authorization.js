const managers = require('../managers')

function authorization(req, res, next) {
  const { authorization } = req.headers;

  // Validar el token
  const [type, token] = authorization.split(' ')
  
  if (type !== 'Bearer') { 
    return res.status(401).json({ message: 'access denied'})
  }

  const [timestamp, email, password] = token.split('_')

  const user = managers.users.getUser(email);

  if (!user) {
    return res.status(401).json({ message: 'access denied'}) 
  }

  if (user.session_token !== token || user.email !== email || user.password !== password) {
    return res.status(401).json({ message: 'access denied'})
  }

  req.user = user 
  next()
}

module.exports = authorization
