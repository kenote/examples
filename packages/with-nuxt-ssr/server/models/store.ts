import { prop, pre } from '@typegoose/typegoose'
import { updatecCounter } from './seq'

@pre<Store>('save', async function (next) {
  try {
    if (this.isNew) {
      let counts = await updatecCounter('store')
      this.id = counts
      next()
    }
  } catch (error) {
    return next(error)
  }
})
export default class Store {

  @prop({ unique: true, default: 0 })
  public id?: number

  @prop({ type: Array, default: [] })
  public upload_type!: string[]

  @prop({ type: Array, default: [] })
  public download_type!: string[]
}