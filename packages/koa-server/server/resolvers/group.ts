import { Resolver, Query, Args, ArgsType, Field, Arg } from 'type-graphql'
import { Group } from '~/entities/group'
import * as service from '~/services'

@ArgsType()
class GroupArgs {

  @Field({ nullable: true, description: '用户组名称' })
  public name?: string

  @Field({ nullable: true, description: '权级' })
  public level?: number
}

@Resolver(Group)
export class GroupResolver {

  @Query(() => [Group], { nullable: true, description: '查询用户组列表' })
  async groups (@Args() args: GroupArgs) {
    let data = await service.Group.groupDao.find(args)
    return data
  }
}