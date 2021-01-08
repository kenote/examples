import { prop, Ref, pre } from '@typegoose/typegoose'
import { updatecCounter } from './seq'
import Group from './group'
import Team from './team'

@pre<User>('save', async function(next) {
  try {
    if (this.isNew) {
      let counts = await updatecCounter('user')
      this.id = counts
    }
    return next()
  } catch (error) {
    return next(error)
  }
})
export default class User {

  @prop({ unique: true, default: 0 })
  public id!: number

  @prop({ required: true })
  public username!: string

  @prop()
  public nickname!: string

  @prop()
  public avatar!: string

  @prop()
  public email!: string

  @prop({ default: 0 })
  public sex!: number

  @prop()
  public mobile!: string

  @prop()
  public encrypt!: string

  @prop()
  public salt!: string

  @prop()
  public jw_token!: string

  @prop({ type: Array, default: [] })
  public binds!: string[]

  @prop({ ref: Group })
  public group!: Ref<Group>

  @prop({ ref: Team })
  public teams!: Array<Ref<Team>>

  @prop({ type: Array, default: [] })
  public access!: string[]

  @prop({ type: Object, default: {} })
  public rstps!: Object

  @prop({ type: Date, default: new Date() })
  public create_at!: Date

  @prop({ type: Date, default: new Date() })
  public update_at!: Date
}