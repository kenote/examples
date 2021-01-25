import 'reflect-metadata'
import { ServerFactory } from '@kenote/core'
import { connect } from './models'
import type {} from '@/types/server'
import { loadConfig } from '@kenote/config'
import { ServerConfigure } from '@/types/config'

async function bootstrap () {
  let engine = process.env.USE_ENGINE ?? 'express'
  let { host, port, secret } = loadConfig<ServerConfigure>('config/server', { mode: 'merge' })
  let { getMetadataStorge } = await import('./pulgins')
  let { authenticate } = await import(`./pulgins/passport/${engine}`)
  getMetadataStorge().engine = engine
  getMetadataStorge().authenticate = authenticate
  await connect()
  // 加载服务端引擎
  let { ServiceEngine } = await import(`@kenote/${engine}`)
  // 加载模块
  let { ApplicationModule } = await import(`./application.module.${engine}`)
  // 创建服务并装载模块
  let server = await ServerFactory(new ServiceEngine({ keys: secret })).create(ApplicationModule)
  // // 将服务监听到 4000 端口
  server.app.listen(port, host, () => {
    console.log(`Service running in %s environment, PORT: %d ...`, process.env.NODE_ENV || 'development', port)
  })
}

// 启动服务
bootstrap()