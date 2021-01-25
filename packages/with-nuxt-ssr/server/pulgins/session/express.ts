import session from '@kenote/express-session'
import connectRedis from 'connect-redis'
import expressSession from 'express-session'
import { createClient } from 'redis'
import { loadConfig } from '@kenote/config'
import { ServerConfigure } from '@/types/config'

const { redisOpts, secret } = loadConfig<ServerConfigure>('config/server')
const RedisStore = connectRedis(expressSession)

export default session({
  secret: [secret],
  store: new RedisStore({ client: createClient({ ...redisOpts }) }),
  resave: true,
  saveUninitialized: true
})