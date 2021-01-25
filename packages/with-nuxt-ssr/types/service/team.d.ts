import { Document, CreateQuery } from 'mongoose'


export declare interface TeamDocument extends Document {
  /**
   * 自动编号
   */
  id                   : number
  /**
   * 团队名称
   */
  name                 : string
  /**
   * 描述
   */
  description         ?: string
  /**
   * 频道权限
   */
  platform             : number[]
  /**
   * 页面权限
   */
  access               : string[]
  /**
   * Rstp 线路
   */
  rstps                : Record<string, string[]>
  /**
   * 是否超级团队
   */
  super                : boolean
  /**
   * 设置团长
   */
  owner               ?: string
}
