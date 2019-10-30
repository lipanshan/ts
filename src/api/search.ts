import axios from './axios'

/*
@param: {service: xxx, tips: xxx,...} data 查询参数
@return: Promise<pending> 查询结果
*/

export function getSearchResult(data: any): any {
  const time: number = new Date().getTime()
  return axios.post('/', {
    service: 'App.CerSearch.SearchCerInfo',
    tips: time,
    Keyword: data.Keyword,
    page: data.page ? data.page : 1,
    perpage: data.perpage
  }).then((res: any): any => {
    return Promise.resolve(res.data)
  })
}
