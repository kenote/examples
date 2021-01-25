
import { IController } from '@kenote/core'

class MetadataStorge {

  engine: string

  authenticate: IController.RequestHandler
}

export function getMetadataStorge (): MetadataStorge {
  if (!(global as any).serverMetadataStorge) {
    (global as any).serverMetadataStorge = new MetadataStorge()
  }
  return (global as any).serverMetadataStorge
}