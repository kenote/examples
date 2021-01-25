import { Document, CreateQuery, UpdateQuery, FilterQuery } from 'mongoose'
import { modelDao } from '@kenote/mongoose'
import { models } from '~/models'
import type { TeamDocument } from '@/types/service'
import Team from '~/models/team'
import { userDao } from './user'

export const teamDao = modelDao<TeamDocument>(models.User, {
  
})

/**
 * 删除团队
 * @param conditions 
 */
export async function remove (conditions: FilterQuery<Team>) {
  let teams = await teamDao.find(conditions)
  let ids = teams.map( d => d._id )
  await userDao.updateMany({ teams: { $in: ids } }, { $pull: { teams: { $in: ids } }}, { multi: true })
  let result = await teamDao.remove(conditions)
  return result
}