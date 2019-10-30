declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

interface stateStatic {
  [key: string]: any
}
interface SignParams {
  service: string
  tips: number 
  [key: string]: any
}