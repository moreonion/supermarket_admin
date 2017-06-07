var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SUPERMARKET_API_URL: '"http://localhost:5000/api/v1"'
})
