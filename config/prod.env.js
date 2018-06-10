'use strict'
//打包给线上环境使用 sps2sever-sps2sever.spsserver.svc.hcyf.n.jd.local
module.exports = {
  NODE_ENV: '"production"',
  SER_URL:'"http://sps-service.jd.com/sps"',
  FRONT_URL:'"http://test.ssa.jd.com/sso/login?ReturnUrl=http://sps-service.jd.com"'
}

