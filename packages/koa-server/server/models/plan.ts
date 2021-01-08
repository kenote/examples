import { prop, Ref, pre } from '@typegoose/typegoose'
import { updatecCounter } from './seq'
import User from './user'

@pre<Plan>('save', async function(next) {
  try {
    if (this.isNew) {
      let counts = await updatecCounter('plan')
      this.id = counts
    }
    return next()
  } catch (error) {
    return next(error)
  }
})
export default class Plan {

  @prop({ unique: true, default: 0 })
  public id!: number

  @prop()
  public name!: string

  @prop()
  public type!: string

  @prop()
  public content!: string

  @prop()
  public channel!: string

  @prop({ type: Date, default: new Date() })
  public create_at!: Date

  @prop({ default: false })
  public share!: boolean

  @prop({ ref: User })
  public share_user!: Array<Ref<User>>

  @prop({ type: Date, default: new Date() })
  public share_at!: Date

  @prop({ ref: User })
  public user!: Ref<User>

  @prop({ type: Date, default: new Date() })
  public update_at!: Date
}