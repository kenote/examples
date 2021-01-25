import { Document, CreateQuery, UpdateQuery, FilterQuery } from 'mongoose'
import { modelDao } from '@kenote/mongoose'
import { models } from '~/models'
import type { UserDocument, RegisterUserDocument, CreateUserDocument, SafeUserDocument } from '@/types/service'
import { httpError, ErrorCode, Bcrypt, mailer } from './'
import { omit } from 'lodash'

export const userDao = modelDao<UserDocument>(models.User, {
  populate: [
    {
      path: 'group',
      select: [ 'id', 'name', 'level', 'description', 'store', 'platform', 'access', 'default' ],
      populate: {
        path: 'store',
        select: [ 'id', 'upload_type', 'download_type' ]
      }
    },
    {
      path: 'team',
      select: [ 'id', 'name', 'description', 'platform', 'access', 'rtsps', 'super', 'owner' ]
    }
  ]
})

/**
 * 创建新用户
 * @param doc 
 */
export async function create (doc: RegisterUserDocument) {
  let isUsername = await userDao.findOne({ username: doc.username })
  if (isUsername) {
    throw httpError(ErrorCode.ERROR_VALID_USERNAME_UNIQUE)
  }
  let isEmail = await userDao.findOne({ email: doc.email })
  if (isEmail) {
    throw httpError(ErrorCode.ERROR_VALID_EMAIL_UNIQUE)
  }
  let password = Bcrypt.encode(doc.password)
  let _doc: CreateUserDocument = {
    ...omit(doc, ['password']),
    ...password
  }
  let user = await userDao.create<SafeUserDocument>(_doc)
  return omit(user, ['encrypt', 'salt']) as UserDocument
}

export async function register (doc: RegisterUserDocument) {
  let user = await create(doc)
  
  return user
}
