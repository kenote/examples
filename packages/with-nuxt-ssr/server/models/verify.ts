
import { prop, pre, Ref } from '@typegoose/typegoose'
import { updatecCounter } from './seq'
import User from './user'

@pre<Verify>('save', async function(next) {
  try {
    if (this.isNew) {
      let counts = await updatecCounter('verify')
      this.id = counts
    }
    return next()
  } catch (error) {
    return next(error)
  }
})
export default class Verify {

  @prop({ unique: true, default: 0 })
  public id!: number

  @prop()
  public type!: string

  @prop()
  public token!: string

  @prop({ type: Date, default: new Date() })
  public create_at!: Date

  @prop({ ref: User })
  public user!: Ref<User>

  @prop({ default: false })
  public approved!: boolean

  @prop()
  public application!: string

  @prop({ type: Date, default: new Date() })
  public update_at!: Date
}