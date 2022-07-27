const path = require('path')
const fs = require('fs')
const utils = require('../utils')
const user = require('../models/user')

async function createUser(email, password) {
  const hashedPassword = utils.hashPassword(password)
  const createdUser = await user.create({ email, password: hashedPassword })
  delete createdUser.dataValues.password
  return createdUser
}

async function loginUser(email, password) {
  const loggedUser = await user.findOne({
    where: {
      email: email
    }
  })

  if (!loggedUser) {
    throw new Error('user not found')
  }

  if (!utils.verifyPassword(password, loggedUser.password)) {
    throw new Error('incorrect password')
  }
  
  return loggedUser
}

async function getUser(email) {
  const requestedUser =  await user.findOne({ where: { email }})
  delete requestedUser.dataValues.password
  return requestedUser
}

module.exports = {
  users: {
    create: createUser,
    login: loginUser,
    getUser
  }
}