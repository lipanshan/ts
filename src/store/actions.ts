import * as types from './mutation-types'

export function setUsernameA({ commit }: any, val: any): void {
  setTimeout((): void => {
    commit(types.USERNAME, val)
  }, 500)
}