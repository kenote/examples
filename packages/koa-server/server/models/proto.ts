
import { prop, pre, Ref } from '@typegoose/typegoose'
import { updatecCounter } from './seq'
import User from './user'

@pre<Proto>('save', async function(next) {
  try {
    if (this.isNew) {
      let counts = await updatecCounter('proto')
      this.id = counts
    }
    return next()
  } catch (error) {
    return next(error)
  }
})
export default class Proto {

  @prop({ unique: true, default: 0 })
  public id!: number

  @prop()
  public protocode!: number

  @prop()
  public protoname!: string

  @prop()
  public payload!: string

  @prop()
  public response!: string

  @prop()
  public rstp!: string

  @prop()
  public channel!: string

  @prop({ type: Date, default: new Date() })
  public create_at!: Date

  @prop({ ref: User })
  public user!: Ref<User>
}