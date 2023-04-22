import Cookies from 'js-cookie'

export const setCookie = (key: string, value: string): void => {
  Cookies.set(key, value, { expires: 31 })
}

export const getCookie = (key: string): string | null => {
  return Cookies.get(key) || null
}

export const removeCookie = (key: string): void => {
  Cookies.remove(key)
}