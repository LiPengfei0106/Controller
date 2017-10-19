import {getRemoteSubscribeURL,sendControlEvent,remotePay} from '@/api/service.js'

var app

var initApp = function(obj){
  app = obj
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

var sendRemoteControlEvent = function(data,action){
  let params = {
    'action': action,
    'project': localStorage.getItem('projectid'),
    'alias': localStorage.getItem('deviceid'),
    'userID': localStorage.getItem('userid'),
    'sendTime':(new Date()).getTime(),
    'data': data
  }
  sendControlEvent(params).then(res => {
    console.log(res);
    if(res.rescode != '200'){
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

  export default {initApp,setDocumentTitle,sendRemoteControlEvent,getMoviePayParams,addNewMovieOrder,showLoading,showErrorTip}