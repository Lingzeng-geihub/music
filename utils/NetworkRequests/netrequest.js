import {basurl} from './basurl'
class Lrequest{
  request(url,meyhod, data){
    return new Promise( (resolve,reject) => {
      wx.request({
        url: basurl + url,
        timeout:9000,
        data:data,
        success: (res) => resolve(res.data),
      })
    })
  }
  get({url,get,data}){
    return this.request(url,get,data)
  }
  post(url,post,data){
    return this.request(url,post,data)
  }
}
export   { Lrequest }