import { ObjectType, Field, Int } from 'type-graphql'
import { Store } from './store'

@ObjectType()
export class Group {

  @Field({ description: '_id', nullable: true })
  public _id!: String

  @Field({ description: 'id', nullable: true })
  public id!: number

  @Field({ description: '用户组名称', nullable: true })
  public name!: string

  @Field({ description: '权级', nullable: true })
  public level!: number

  @Field({ description: '描述', nullable: true })
  public description!: string

  @Field(() => [Int], { description: '可访问频道', nullable: true })
  public platform!: number[]

  @Field(() => [String], { description: '可访问页面', nullable: true })
  public access!: string[]

  @Field(() => Store, { description: '上传下载权限', nullable: true })
  public store!: Store

  @Field({ description: '默认用户组', nullable: true })
  public default!: boolean
}

