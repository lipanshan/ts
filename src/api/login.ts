import axios, { createSign } from './axios'
/// <refrence path="api/rsa.d.ts" />
function getRSACode(newStr: string): string {
  const PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAm39nQmLTyX/Ej961KxU+gJW4UgqEQnoaJowSgkK/4qNJAduIz7bhHWtxZ9SRNwUAXwZWZzh81dfYIkvhc5jikIVOEZoChOtUnkP+2jrpQmYMRSHwVQbsM+/k3U4Al7gQrJDwzRgxePyrtisZHpUtkN77bJXgQGEfDX09WytG4MTFk99hdXM8vllw4Nyw+ErZL3uVGK2tjFc1hCFXMXQwpWkDH2NDcGTxYacQp4ljyIouDQCf3Lhw0m+qhxL1jNYxk9oCzFkZFOoat2PRhmV7Lp6E/+dWnWXIT86EaI7Fqy238rhnD2WQ4dD/fxq1yXADgaoT24549Xzmywd3hDo8mQIDAQAB-----END PUBLIC KEY-----'
  const obj = RSA()
  const crypt = obj.JSEncrypt()
  crypt.setPublicKey(PUBLIC_KEY)
  const encrypted = crypt.encrypt(newStr)
  return encrypted
}
export function loginHandle(data: { username: string, password: string, vcode: number | string }): Promise<boolean> {
  const time: number = new Date().getTime()
  return axios.post('/', {
    service: 'App.User.Login',
    tips: time,
    username: getRSACode(data.username),
    password: getRSACode(data.password),
    vcode: data.vcode
  })
}

export function getVCode(width: number = 68, height: number = 30, fontSize: number = 18, length: number = 4): string {
  const time: number = new Date().getTime()
  return `${process.env.VUE_APP_API_URL}?service=App.User.VcodeCreate&tips=${time}&length=${length}&width=${width}&height=${height}&fontSize=${fontSize}&sign=${createSign({
    service: 'App.User.VcodeCreate',
    tips: time,
    length,
    width,
    height,
    fontSize
  })}`
}