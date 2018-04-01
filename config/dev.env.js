'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const privateEnv = require('./priv.env')

module.exports = merge(prodEnv, privateEnv,{
  NODE_ENV: '"development"'
})
