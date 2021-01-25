import { Document, CreateQuery, UpdateQuery, FilterQuery } from 'mongoose'
import { modelDao } from '@kenote/mongoose'
import { models } from '~/models'
import type { GroupDocument, CreateGroupDocument } from '@/types/service'
import { storeDao } from '~/services/store'
import { isArray } from 'lodash'
import Group from '~/models/group'
import { omit } from 'lodash'

export const groupDao = modelDao<GroupDocument>(models.Group, {
  populate: {
    path: 'store',
    select: [ 'id', 'upload_type', 'download_type' ]
  }
})

/**
 * 获取默认用户组
 */
export async function defaultGroup () {
  return await groupDao.findOne({ default: true })
}

/**
 * 创建新用户组
 * @param docs 
 */
export async function create (docs: CreateGroupDocument | CreateGroupDocument[]) {
  if (isArray(docs)) {
    let _docs1 = docs.map( s => s.store ?? { upload_type: [], download_type: [] } ) as Array<CreateQuery<Document>>
    let stores = await storeDao.create(_docs1)
    let ids = stores.map( s => s._id )
    let _docs2 = docs.map( (s, i) => ({ ...s, store: ids[i] })) as Array<CreateQuery<Document>>
    let groups = await groupDao.create(_docs2)
    return groups
  }
  else {
    let store = await storeDao.create(docs.store ?? { upload_type: [], download_type: [] })
    let group = await groupDao.create({ ...docs, store: store._id })
    return group
  }
}

/**
 * 更新用户组
 * @param conditions 
 * @param doc 
 */
export async function update (conditions: FilterQuery<Group>, doc: UpdateQuery<Group>) {
  let groupDoc = omit(doc, ['store'])
  let result = await groupDao.updateMany(conditions, groupDoc)
  if (doc.store) {
    let group = await groupDao.find(conditions)
    let storeIds = group.map( d => d.store._id )
    await storeDao.updateMany({ _id: { $in: storeIds } }, doc.store)
  }
  return result
}

/**
 * 删除用户组
 * @param conditions 
 */
export async function remove (conditions: FilterQuery<Group>) {
  let group = await groupDao.find(conditions)
  let storeIds = group.map( d => d.store._id )
  await storeDao.remove({ _id: { $in: storeIds } })
  let result = await groupDao.remove(conditions)
  return result
}

