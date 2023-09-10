/*
 * @Author: Kolf
 * @Date: 2023-04-16 19:20:19
 * @LastEditors: kolf kolf@live.cn
 * @LastEditTime: 2023-04-22 14:20:35
 * @FilePath: /any-proxy/src/renderer/src/utils/index.ts
 * @Description:
 */
export const createId = (): string => 'id-' + Date.now() + (Math.random() + '').replace('.', '')

/*
 * 格式化日期
 * @param date Date or timestamp
 * @param formatter yyyyMMddHHmmss
 */
export const formatDate = (date: any, formatter: string) => {
  if (typeof date !== 'object') {
    date = new Date(Number(date))
  }

  const transform = (value: number) => {
    return value < 10 ? '0' + value : value
  }

  return formatter.replace(/^YYYY|MM|DD|hh|mm|ss|ms/g, (match) => {
    switch (match) {
      case 'YYYY':
        return transform(date.getFullYear())
      case 'MM':
        return transform(date.getMonth() + 1)
      case 'mm':
        return transform(date.getMinutes())
      case 'DD':
        return transform(date.getDate())
      case 'hh':
        return transform(date.getHours())
      case 'ss':
        return transform(date.getSeconds())
      case 'ms':
        return transform(date.getMilliseconds())
    }
  })
}

export const selectText = (element) => {
  let range, selection
  if (window.getSelection) {
    selection = window.getSelection()
    range = document.createRange()
    range.selectNodeContents(element)
    selection.removeAllRanges()
    selection.addRange(range)
  } else if (document.body.createTextRange) {
    range = document.body.createTextRange()
    range.moveToElementText(element)
    range.select()
  }
}

export const getQueryParameter = (name) => {
  const results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href)
  if (results == null) {
    return ''
  } else {
    return results[1] || ''
  }
}

export const parseCookies = (cookieString: string): Record<string, string> | null => {
  if (!cookieString) {
    return null
  }
  const cookies: Record<string, string> = {}
  // 使用正则表达式匹配 cookie 字符串中的每个 cookie
  const cookiePairs = cookieString.split(';')
  for (const pair of cookiePairs) {
    const [name, value] = pair.trim().split('=')
    cookies[name] = value
  }

  return cookies
}

export const parseString = (str: string) => {
  try {
    return JSON.parse(str)
  } catch (err) {
    console.log(err)
  }
  return JSON.stringify(str)
}
