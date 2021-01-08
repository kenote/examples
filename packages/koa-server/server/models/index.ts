import mongoose, { ConnectionOptions } from 'mongoose'
import { getModelForClass, setGlobalOptions, Severity } from '@typegoose/typegoose'
import Store from './store'
import Group from './group'
import User from './user'
import Team from './team'
import Seq from './seq'
import Ditch from './ditch'
import Plan from './plan'
import Proto from './proto'
import Ticket from './ticket'
import Verify from './verify'

setGlobalOptions({ 
  options: { 
    allowMixed: Severity.ALLOW 
  }
})

const uris = 'mongodb://localhost:27017/koa-test'
const options: ConnectionOptions = { 
  useNewUrlParser: true, 
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

export async function connect () {
  try {
    await mongoose.connect(uris, options)
    console.log(`connect to ${uris}`)
  } catch (error) {
    console.error(`connect to ${uris} error: ${error.message}`)
    process.exit(1)
  }
}

export const models = {
  Seq      : getModelForClass(Seq),
  Store    : getModelForClass(Store),
  Group    : getModelForClass(Group),
  User     : getModelForClass(User),
  Team     : getModelForClass(Team),
  Ditch    : getModelForClass(Ditch),
  Plan     : getModelForClass(Plan),
  Proto    : getModelForClass(Proto),
  Ticket   : getModelForClass(Ticket),
  Verify   : getModelForClass(Verify)
}