import { isEmail, isString, dateFormat } from '../src'

describe('\nTests', () => {
  test('thondery@163.com isEmail', () => {
    let result = isEmail('thondery@163.com')
    expect(result).toBe(true)
  })
  test('thondery@163.com isString', () => {
    let result = isString('thondery@163.com')
    expect(result).toBe(true)
  })
  test('dateFormat', () => {
    let date = new Date()
    let result = dateFormat(date, 'YYYY-MM-DD')
    let expected = `${date.getFullYear()}-${toNumber(date.getMonth()+1)}-${toNumber(date.getDate())}`
    expect(result).toBe(expected)
  })
})

function toNumber (value: number, len: number = 2): string {
  let val = value.toString()
  // tslint:disable-next-line: prefer-for-of
  for (let i:number=val.length;i<len ;i++) {
    val = '0' + val
  }
  return val
}