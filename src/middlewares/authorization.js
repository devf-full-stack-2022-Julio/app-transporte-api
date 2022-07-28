const managers = require('../managers')
const verifyToken = require('../utils/verifyToken')

async function authorization(req, res, next) {
  const { authorization } = req.headers;

  // Validar el token
  const [type, token] = authorization.split(' ')
  
  if (type !== 'Bearer') { 
    return res.status(401).json({ message: 'access denied'})
  }

  // Validar token
  const verifiedToken = await verifyToken(token)
  
  if (!verifiedToken) {
    return res.status(401).json({ message: 'access denied'}) 
  }

  const userId = verifiedToken.sub;

  // El token es valido
  const user = await managers.users.getUser(userId);

  if (!user) {
    return res.status(401).json({ message: 'access denied'}) 
  }

  req.user = user 
  next()
}

module.exports = authorization
