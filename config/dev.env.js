'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SER_URL:'"http://localhost:1601/sps"', //运行 npm run dev时，后端请求会发到这里
  FRONT_URL:'"http://test.ssa.jd.com/sso/login?ReturnUrl=http://sps.ls.jd.com:8080/#/salePlan"'
})
