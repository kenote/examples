import { Document, CreateQuery } from 'mongoose'
import type { StoreDocument, CreateStoreDocument } from './store'

export declare interface GroupDocument extends Document {
  /**
   * 自动编号
   */
  id                   : number
  /**
   * 用户组名称
   */
  name                 : string
  /**
   * 权级
   */
  level                : number
  /**
   * 描述
   */
  description         ?: string
  /**
   * 上传下载权限
   */
  store                : StoreDocument
  /**
   * 频道权限
   */
  platform             : number[]
  /**
   * 页面权限
   */
  access               : string[]
  /**
   * 是否默认组
   */
  default              : boolean
}

export declare interface CreateGroupDocument extends EditGroupDocument {
  /**
   * 用户组名称
   */
  name                 : string
  /**
   * 权级
   */
  level                : number
}

export declare interface EditGroupDocument {
  /**
   * 用户组名称
   */
  name                ?: string
  /**
   * 权级
   */
  level               ?: number
  /**
   * 描述
   */
  description         ?: string
  /**
   * 上传下载权限
   */
  store               ?: CreateQuery<CreateStoreDocument>
  /**
   * 频道权限
   */
  platform            ?: number[]
  /**
   * 页面权限
   */
  access              ?: string[]
  /**
   * 是否默认组
   */
  default             ?: boolean
}