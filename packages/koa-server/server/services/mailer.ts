import { Mailer } from '@kenote/mailer'
import path from 'path'
import { renderString } from 'nunjucks'

export default new Mailer({
  smtpOptions: {
    host: 'smtp.mxhichina.com',
    port: 465,
    secure: true,
    auth: {
      user: 'service@kenote.top',
      pass: 'keNode2016'
    }
  },
  mailDir: path.resolve(process.cwd(), 'mails'),
  asyncRetryOptions: {
    times: 5,
    interval: 200
  },
  renderString
})