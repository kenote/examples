import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Store {

  @Field({ description: '_id', nullable: true })
  public _id!: String

  @Field({ description: 'id', nullable: true })
  public id!: number

  @Field(() => [String], { description: '上传权限', nullable: true })
  public upload_type!: string[]

  @Field(() => [String], { description: '下载权限', nullable: true })
  public download_type!: string[]
}
