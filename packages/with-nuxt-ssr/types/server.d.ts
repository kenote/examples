import { CreateGroupDocument, GroupDocument } from './service'

declare module '~/services/group' {

  function create<T = GroupDocument> (docs: CreateGroupDocument): Promise<T>
  function create<T = GroupDocument> (docs: CreateGroupDocument[]): Promise<T[]>
}