import isEmail from 'validator/lib/isEmail'
import isString from 'lodash/isString'
import dayjs from 'dayjs'

export {
  isEmail,
  isString
}

export function dateFormat (date?: string | number | Date | dayjs.Dayjs, template?: string): string {
  return dayjs(date).format(template)
}
