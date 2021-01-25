import { Document } from 'mongoose'

export declare interface StoreDocument extends Document, CreateStoreDocument {
  /**
   * 自动编号
   */
  id                   : number
}

export declare interface CreateStoreDocument {
  /**
   * 上传权限
   */
  upload_type          : string[]
  /**
   * 下载权限
   */
  download_type        : string[]
}