const response = require('../helpers/formResponse')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { JWT_PRIVATE_KEY } = process.env
// )
module.exports = {
  authentication: (req, res, next) => {
    try {
      const bearerToken = req.headers.token
      if (!bearerToken) {
        return response(res, 401, 'Token is required')
      }
      const token = bearerToken.split(' ')[1]
      const decode = jwt.verify(token, JWT_PRIVATE_KEY)
      req.dataUser = decode
      next()
    } catch (error) {
      return response(res, 401, error)
    }
  }
}
