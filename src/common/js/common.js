import {getRemoteSubscribeURL,sendControlEvent,remotePay,uploadControllerAction} from '@/api/service.js'
import { configs } from '../../data/staticData';
import * as wilddog from 'wilddog'

var app
var deviceActionRef
var deviceInfoRef
var deviceMediaInfoRef

var initApp = function(obj){
  app = obj
}

var initWildDog = function(deviceid){
  let config = {
    // syncURL: "https://wd4175375867qzbddu.wilddogio.com/" //输入节点 URL
    syncURL: "https://wd8075382496vigvol.wilddogio.com/" //输入节点 URL
    // syncURL: "https://"+wilddog_appid+".wilddogio.com/" //输入节点 URL
  };
  console.log("initWildDog");
  console.log(config);
  wilddog.initializeApp(config);
  var ref = wilddog.sync().ref();
  var hotelRef = ref.child('demo');
  deviceActionRef = hotelRef.child('actionList').child(deviceid); 
  deviceInfoRef = hotelRef.child('deviceInfoList').child(deviceid);
  deviceMediaInfoRef = hotelRef.child('mediaInfoList').child(deviceid);
}

var setDocumentTitle = function(title) {
  title = title || '遥控器';
  document.title = title;
  if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
    let iframe = document.createElement('iframe')
    iframe.src = '/MP_verify_zxjwxCcP80t475ww.txt'
    iframe.style.display = 'none'
    iframe.onload = function () {
      setTimeout(function () {
        iframe.remove()
      }, 0)
      document.body.appendChild(iframe)
    }
  }
}

var showRedirectUrl = function(projectName){
  var urlImg = document.getElementById("urlImg");
  if(!projectName){
    showLoading(false)
    urlImg.setAttribute("src", "http://mres.cleartv.cn/default/18c63459a2c069022c7790430f761214_150596215158.png");    
    return;
  }
  console.log('showRedirectUrl');
  let params = {
    'projectID': projectName
  }
  getRemoteSubscribeURL(params).then(res => {
    showLoading(false)
    let result = res;
    let urlType = res.urlType;
    if(result.rescode == '200' && urlType == 'image'){
      urlImg.setAttribute("src", result.subscribeurl);
    }else{
      console.log('show default');
      urlImg.setAttribute("src", "http://mres.cleartv.cn/default/18c63459a2c069022c7790430f761214_150596215158.png");
    }
  })
}

var getMoviePayParams = function(movie,action){
  return {
    'action' : action,
    'clear_session': sessionStorage.getItem('clear_session'),
    'data': {
      'alias': localStorage.getItem('deviceid'),
      'productType': "Movie",
      'productID':movie.ID,
      'productName':movie.Name['zh-CN'],
      'fee':movie.fee,
      'userid': localStorage.getItem('userid'),
      'projectName': localStorage.getItem('projectid'),
      'orderID':-1
    }
  }
}

var isSending = false
var sendRemoteControlEvent = function(data,action){
  if(configs.remoteType == "WeiXin_proxy"){
    console.log('sendWD')
    sendWD(data,action);
  }else{
    console.log('sendOpenvod')
    sendJG(data,action);
  }
}

var sendJG = function(data,action){
  if(isSending)
    return
  isSending = true
  let params = {
    'action': action,
    'project': localStorage.getItem('projectName'),
    'alias': localStorage.getItem('deviceAlias'),
    'userID': localStorage.getItem('userid'),
    'sendTime':(new Date()).getTime(),
    'data': data
  }
  console.log(params)
  sendControlEvent(params).then(res => {
    console.log(res);
    if(res.rescode != '200'){
      app.showErrorTip("请重新扫描电视上的二维码")
    }
    isSending = false
  }).catch(error => {
    console.log(error);
    app.showErrorTip("网络错误")
    isSending = false
  })
}

var sendWD = function(content,action){
  let params = {
    'deviceIP':localStorage.getItem('deviceIP'),
    'regID':localStorage.getItem('regID'),
    'deviceAlias':localStorage.getItem('deviceAlias'),
    'packageName':'com.clearcrane.vod',
    'projectName': localStorage.getItem('projectName'),
    'actionType': action,
    'actionContent':content,
    'userID': localStorage.getItem('userid'),
    'newAction':true,
    'sendTime':(new Date()).getTime()
  }
  console.log(params)
  sendOpenvod(params)
  deviceActionRef.update(params)
}

var sendOpenvod = function(params){
  uploadControllerAction(params).then(res => {
    console.log(res);
    if(res.rescode == 200 || res.rescode == '200'){
      
    }else{
      app.showErrorTip("请重新扫描电视上的二维码")
    }
  }).catch(error => {
    console.log(error);
    app.showErrorTip("网络错误")
  })
}

var WXPay = function(api){
  console.log('WXPay');
  wx.chooseWXPay({
    appId:api.appId,
    timestamp:api.timeStamp,
    nonceStr: api.nonceStr,
    package: api.package,
    signType: api.signType,
    paySign: api.paySign,
    success: function(res) {
      console.log(res);
    },
    fail: function (res) {
      console.log(res);
      // app.showErrorTip("下单失败，请从电视上购买")
    }
  });
}

var addNewMovieOrder = function(movie){
  console.log('newOrder')
  let params = getMoviePayParams(movie,'newOrder')
  remotePay(params).then(res => {
    console.log(res)
    console.log('payPrepare')
    params.data.orderID = res.data.orderID;
    params.action = 'payPrepare';
    remotePay(params).then(res => {
      console.log(res)
      WXPay(res.data.WEIXIN.JS_Pay_API);
    }).catch(error => {
      console.log(error);
      app.showErrorTip("下单失败，请从电视上购买")
    })
  }).catch(error => {
    console.log(error);
    app.showErrorTip("下单失败，请从电视上购买")
  })
}

var showLoading = function(isShow){
  app.showLoading(isShow)
}

var showErrorTip = function(content){
  app.showErrorTip(content)
}

var playAudio = function(){
  let audio = document.querySelector('#audio');
  audio.currentTime = 0;
  audio.play();
}

  export default {
    initApp,
    initWildDog,
    setDocumentTitle,
    sendRemoteControlEvent,
    getMoviePayParams,
    addNewMovieOrder,
    showLoading,
    showErrorTip,
    showRedirectUrl,
    playAudio
  }