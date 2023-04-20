/* eslint-disable @typescript-eslint/explicit-function-return-type */
/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-16 13:48:15
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-16 13:48:41
 * @FilePath: /any-proxy/src/lib/mine.ts
 * @Description:
 */
/* eslint-disable no-prototype-builtins */
const REG = {
  json: /application\/json/i,
  image: /image\//i,
  urlencoded: /\/x-www-form-urlencoded/i,
  text: /text\//i,
  font: /application\/font-/i
}

/**
 * @param {string} contentType
 */
export const getMimeType = (contentType) => {
  for (const key in REG) {
    if (REG.hasOwnProperty(key)) {
      if (REG[key].test(contentType)) return key
    }
  }
  return 'other'
}
