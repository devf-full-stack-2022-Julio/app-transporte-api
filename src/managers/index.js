const path = require('path')
const fs = require('fs')

function createUser(email, password) {
  const data = fs.readFileSync('database.json')
  const { users } = JSON.parse(data)

  const userFound = users.find((user) => user.email === email)

  if (userFound) {
    throw new Error('user already exists')
  }

  const createdUser = { email, password }
  
  const newUsers = users.concat(createdUser)
  const jsonData = JSON.stringify({ users: newUsers })
  fs.writeFileSync('database.json', jsonData)

  return createdUser;
}

module.exports = {
  users: {
    create: createUser
  }
}