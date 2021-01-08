import { prop, Ref, pre } from '@typegoose/typegoose'
import { updatecCounter } from './seq'
import Team from './team'

@pre<Ditch>('save', async function(next) {
  try {
    if (this.isNew) {
      let counts = await updatecCounter('ditch')
      this.id = counts
    }
    return next()
  } catch (error) {
    return next(error)
  }
})
export default class Ditch {

  @prop({ unique: true, default: 0 })
  public id!: number

  @prop({ required: true })
  public name!: string

  @prop()
  public label!: string

  @prop()
  public channel!: string

  @prop({ type: Object, default: {} })
  public cardinal_number!: Object

  @prop({ ref: Team })
  public teams!: Array<Ref<Team>>
}