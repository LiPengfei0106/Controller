import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://openvod.cleartv.cn'
Vue.prototype.http = axios

export default axios

export const getResources = (params) => {
  return axios.post('/backend_mgt/v1/cacheproxymovie', params).then(res => res.data)
}

export const sendControlEvent= (params) => {
   params = Object.assign({'package': 'com.clearcrane.vod'}, params);
  return axios.post('/backend_wx/v1/remote_control', params).then(res => res.data)
}

export const getWxParams = (params) => {
  return axios.post('/backend_wx/v1/buildsession', params).then(res => res.data)
}

export const checkWxSubs = (params) => {
  return axios.post('/backend_wx/v1/wxusersubscheck', params).then(res => res.data)
}

export const bindTVDevice = (params) => {
  return axios.post('/backend_wx/v1/bindtvdevice', params).then(res => res.data)
}

export const getTVDeviceId = (params) => {
  return axios.post('/backend_wx/v1/gettvdeviceid', params).then(res => res.data)
}

export const getWXSign = (params) => {
  return axios.post('/backend_wx/v1/jssdksign', params).then(res => res.data)
}

export const getRemoteSubscribeURL = (params) => {
  return axios.post('/backend_wx/v1/getremotesubscribeurl', params).then(res => res.data)
}

export const remotePay = (params) => {
  return axios.post('/rc/remotepay', params).then(res => res.data)
}

