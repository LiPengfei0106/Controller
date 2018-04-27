import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://openvod.cleartv.cn'
Vue.prototype.http = axios

export default axios

export const getResources = (params) => {
  return axios.post('/rc/controllerdata', params).then(res => res.data)
}

export const sendControlEvent= (params) => {
   params = Object.assign({'package': 'com.clearcrane.vod'}, params);
  return axios.post('/backend_wx/v1/remote_control', params).then(res => res.data)
}

export const getWXSign = (params) => {
  return axios.post('/rc/weixinauth', params).then(res => res.data)
}

export const getRemoteSubscribeURL = (params) => {
  return axios.post('/backend_wx/v1/getremotesubscribeurl', params).then(res => res.data)
}

export const remotePay = (params) => {
  return axios.post('/rc/remotepay', params).then(res => res.data)
}

export const uploadControllerAction = (params) => {
  return axios.post('/rc/controlleraction', params).then(res => res.data)
}

export const logon = (params) => {
  return axios.post('/rc/logon', params).then(res => res.data)
}


