// PM2 Configure
const { loadConfig } = require('@kenote/config')
const { name, secret } = loadConfig('config/server')

module.exports = {
  apps : [
    {
      name: name,
      script: './node_modules/.bin/ts-node',
      args: '-T -r tsconfig-paths/register ./server/index.ts',
      max_memory_restart: '200M',
      instances: 1,
      instance_var: secret || 'INSTANCE_ID',
      exec_mode: 'cluster',
      cwd: './',
      env: {
        TS_NODE_PROJECT: './server/tsconfig.json',
        NODE_ENV: 'production',
        USE_ENGINE: 'koa',
        USE_PORT: 7000
      }
    }
  ]
}