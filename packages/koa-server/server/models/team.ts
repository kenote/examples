import { prop, pre } from '@typegoose/typegoose'
import { updatecCounter } from './seq'

@pre<Team>('save', async function(next) {
  try {
    if (this.isNew) {
      let counts = await updatecCounter('team')
      this.id = counts
    }
    return next()
  } catch (error) {
    return next(error)
  }
})
export default class Team {

  @prop({ unique: true, default: 0 })
  public id!: number

  @prop({ required: true })
  public name!: string

  @prop({ default: false })
  public super!: boolean

  @prop({ type: Array, default: [] })
  public platform!: number[]

  @prop({ type: Array, default: [] })
  public access!: string[]

  @prop({ type: Object, default: {} })
  public rstps!: Object

  @prop()
  public description!: string
}