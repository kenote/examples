import { isEmail, isString, dateFormat } from '../src'

// isEmail
console.log(`thondery@163.com isEmail:`, isEmail('thondery@163.com'))

// isString
console.log(`thondery@163.com isString:`, isString('thondery@163.com'))

// dateFormat
console.log(`dateFormat:`, dateFormat(Date.now(), 'YYYY-MM-DD hh:mm:ss'))
