import { Document, CreateQuery } from 'mongoose'
import { ObjectId } from 'bson'
import { GroupDocument, TeamDocument } from './'

export declare enum SexType {
  /**
   * 男
   */
  Male,
  /**
   * 女
   */
  Female,
  /**
   * 情侣
   */
  Couple
}

export declare interface UserDocument extends Document {
  /**
   * 自动编号
   */
  id                   : number
  /**
   * 用户名
   */
  username             : string
  /**
   * 昵称
   */
  nickname            ?: string
  /**
   * 头像
   */
  avatar              ?: string
  /**
   * 性别
   */
  sex                 ?: SexType
  /**
   * 电子邮箱
   */
  email                : string
  /**
   * 移动电话
   */
  mobile              ?: string
  /**
   * Jwt Token
   */
  jw_token            ?: string
  /**
   * 绑定
   */
  binds                : string[]
  /**
   * 用户组
   */
  group                : GroupDocument
  /**
   * 加入的团队
   */
  teams                : TeamDocument[]
  /**
   * 页面权限
   */
  access               : string[]
  /**
   * 创建时间
   */
  create_at            : Date
  /**
   * 更新时间
   */
  update_at            : Date
}

export declare interface SafeUserDocument extends UserDocument {
  /**
   * 密码加密值
   */
  encrypt              : string
  /**
   * 加密附加值
   */
  salt                 : string
}

export declare interface RegisterUserDocument extends EditUserDocument {
  /**
   * 密码
   */
  password             : string
}

export declare interface CreateUserDocument extends EditUserDocument {
  /**
   * 密码加密值
   */
  encrypt              : string
  /**
   * 加密附加值
   */
  salt                 : string
}

export declare interface EditUserDocument {
  /**
   * 用户名
   */
  username            ?: string
  /**
   * 昵称
   */
  nickname            ?: string
  /**
   * 头像
   */
  avatar              ?: string
  /**
   * 性别
   */
  sex                 ?: SexType
  /**
   * 电子邮箱
   */
  email               ?: string
  /**
   * 移动电话
   */
  mobile              ?: string
  /**
   * Jwt Token
   */
  jw_token            ?: string
  /**
   * 绑定
   */
  binds               ?: string[]
  /**
   * 用户组
   */
  group               ?: ObjectId | string
  /**
   * 加入的团队
   */
  teams               ?: Array<ObjectId | string>
  /**
   * 页面权限
   */
  access              ?: string[]
  /**
   * 更新时间
   */
  update_at           ?: Date
}

export type FindUserType = 'username' | 'email' | 'nickname' | 'mobile'