import { prop, Ref, pre } from '@typegoose/typegoose'
import { updatecCounter } from './seq'
import Store from './store'

@pre<Group>('save', async function(next) {
  try {
    if (this.isNew) {
      let counts = await updatecCounter('group')
      this.id = counts
    }
    return next()
  } catch (error) {
    return next(error)
  }
})
export default class Group {

  @prop({ unique: true, default: 0 })
  public id!: number

  @prop({ required: true })
  public name!: string

  @prop({ default: 0 })
  public level!: number

  @prop()
  public description!: string

  @prop({ type: Array, default: [] })
  public platform!: number[]

  @prop({ type: Array, default: [] })
  public access!: string[]

  @prop({ ref: Store })
  public store!: Ref<Store>

  @prop({ default: false })
  public default!: boolean
}