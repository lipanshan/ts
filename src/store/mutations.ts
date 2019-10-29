import * as types from './mutation-types'

const mutations: any = {
  [types.USERNAME](state: stateStatic, val: any): void {
    state[types.USERNAME] = val
  }
}
export default mutations