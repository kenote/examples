import { modelDao } from '@kenote/mongoose'
import { models } from '~/models'
import type { StoreDocument } from '@/types/service'

export const storeDao = modelDao<StoreDocument>(models.Store)