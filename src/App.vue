<template>
  <div id="app">
    <audio id="audio" src="./static/assets/tink.wav"></audio>
    <ErrorTip :error-tip-info='errorTipInfo' ref="ErrorTip"></ErrorTip>
    <div class='loading' v-show='isShowLoading'></div>
    <div class="qrcode">
      <img id="urlImg" />
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// var needLogin = false
var urlParams

(window.onpopstate = function () {
  var match,
      pl     = /\+/g,
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
      query  = window.location.search.substring(1)

  urlParams = {}
  while (match = search.exec(query))
     urlParams[decode(match[1])] = decode(match[2])
})();

import common from './common/js/common.js'
import ErrorTip from '@/components/Common/ErrorTip.vue'
import {configs} from '@/data/staticData.js'
import {getWXSign,getResources,logon} from '@/api/service.js'

export default {
  name: 'app',
  components: {
    ErrorTip
  },
  data() {
    return {
      errorTipInfo:{
        isShow:false,
        errorContent:'Error',
        showTime:5
      },
      isShowLoading:false,
      projectName:''
    }
  },
  beforeCreate: function() {
    common.initApp(this)
    // 禁掉长按事件
    document.oncontextmenu=function(e){
      //或者return false;
      e.preventDefault();
    };
  },
  beforeMount() {
    console.log('beforeMount')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
    if(this.$route.path == '/'){
      // window.opener=null;
      // window.open('','_self');
      // window.close();
      this.init()
    }
  },
  mounted() {
    console.log('mounted')
    this.init()
  },
  methods: {
    init() {
      console.log('APP init')
      console.log(urlParams)
      if(configs.needLogin){
        console.log('needLogin')
        if(urlParams.code && urlParams.state){
        // if(urlParams.appid && urlParams.code && urlParams.state){
          this.checkProject(urlParams.code,urlParams.state)
        }else{
          console.log('没有登录所需要的Params')
          common.showRedirectUrl()
        }
      }else{
        console.log('不用登录')
        this.projectName = 'demo';
        if(configs.remoteType == 'WildDog'){
            common.initWildDog('testDevice')
        }else{
          localStorage.setItem('projectName', this.projectName);
          localStorage.setItem('deviceAlias', 'unknow');
          localStorage.setItem('mac', 'unknow');
          localStorage.setItem('deviceIP','unknow');
          localStorage.setItem('devicePlatform', 'unknow');
          this.$router.push({name:'Main'});
        }
      }
    },
    showErrorTip(content){
      this.errorTipInfo.showTime = 3
      if(content)
        this.errorTipInfo.errorContent = content
      if(this.errorTipInfo.isShow != true)
        this.checkErrorTime()
      this.errorTipInfo.isShow = true
    },
    checkErrorTime(){
      setTimeout(() =>{
        this.errorTipInfo.showTime--
        if(this.errorTipInfo.showTime<0){
          this.errorTipInfo.isShow = false
        }else{
          this.checkErrorTime()
        }
      }, 1000)
    },
    showLoading(isShow){
      this.isShowLoading = isShow
    },
    checkProject(code,state){
      console.log('checkProject');
      console.log('code:'+code);
      console.log('state:'+state);
      if(state == 'gettvdeviceid'){
        console.log('读取缓存')
        this.projectName = localStorage.getItem('projectName');
        configs.controlSender = localStorage.getItem('controlSender');
        if(!this.projectName){
          console.log('没有缓存')
          this.projectName = 'demo'
          localStorage.setItem('projectName', this.projectName);
          localStorage.setItem('mac', 'unknow');
          localStorage.setItem('deviceAlias', 'unknow');
          localStorage.setItem('devicePlatform', 'unknow');
          localStorage.setItem('deviceIP', 'unknow');
        }
      }else if((state.split('$')).length > 2){
        console.log('老的极光的参数')
        let deviceAlias = state.split(';')[0]
        this.projectName = deviceAlias.split('$')[0]

        configs.controlSender = 'old';
        localStorage.setItem('controlSender', 'old');
        localStorage.setItem('projectName', this.projectName);
        localStorage.setItem('deviceAlias', deviceAlias);
        localStorage.setItem('mac', 'unknow');
        localStorage.setItem('devicePlatform', 'unknow');
        localStorage.setItem('deviceIP', 'unknow');
      }else{
        let decodedData = window.atob(state).split(';');
        if(decodedData.length > 3){
          console.log('新的参数')
          console.log(decodedData);
          let deviceAlias = state
          this.projectName = decodedData[0];
          let mac = decodedData[1];
          let deviceIP = decodedData[2];
          let devicePlatform = decodedData[3];
          configs.controlSender = 'new';
          localStorage.setItem('controlSender', 'new');
          localStorage.setItem('projectName', this.projectName);
          localStorage.setItem('mac', mac);
          localStorage.setItem('deviceAlias', deviceAlias);
          localStorage.setItem('devicePlatform', devicePlatform);
          localStorage.setItem('deviceIP', deviceIP);
        }else{
          console.log('不知道的参数')
          common.showRedirectUrl()
          return;
        }
      }
      let params = {
            'action': 'checkInfo',
            'projectID': this.projectName
          }
      console.log(params);
      getResources(params).then(res => {
        console.log("checkInfo")
        console.log(res)
        configs.remoteType = res.data.remoteType;
        configs.hasMovie = res.data.hasMovie == 1;
        configs.hasLive = res.data.hasLive == 1;
        configs.canPay = res.data.canPay == 1;
        configs.controlType = res.data.controlType;
        configs.movieDiscount = res.data.movieDiscount;
        if(configs.remoteType == 'WeiXin_proxy'){

        }else if(configs.remoteType == 'WildDog'){
          common.initWildDog(localStorage.getItem('mac'))
        }
        this.logon(code)
      }).catch ( error => {
        console.log(error)
        common.showRedirectUrl(this.projectName)
      })
    },
    logon(code){
      console.log('logon');
      let params = {
        "Type":"WeiXin",
        "action":"logon",
        'projectName': this.projectName,
        "CODE":code
      }
      logon(params).then(res => {
        console.log(res);
        if(res.subscribe == 1){
          this.getWxSignature();
          localStorage.setItem('userid', res.userID);
          localStorage.setItem('openid', res.openid);
          localStorage.setItem('nickName',res.user_info['nickname'])
          localStorage.setItem('headImgUrl',res.user_info['headimgurl'])
          localStorage.setItem('sex',res.user_info['sex'])
          localStorage.setItem('province',res.user_info['province'])
          localStorage.setItem('country',res.user_info['country'])
          localStorage.setItem('city',res.user_info['city'])
          localStorage.setItem('language',res.user_info['language'])
          this.$router.push({name:'Main'})
        }else{
          common.showRedirectUrl(this.projectName)
        }
      }).catch ( error => {
        console.log(error)
        common.showRedirectUrl(this.projectName)
      })
    },
    getWxSignature () {
      console.log('getWxSignature');
      let data = {
        "action":"getJSSDK",
        'appid': configs.appid,
        // 'clear_session': sessionStorage.getItem('clear_session'),
        'url': window.location.href.split('#')[0]
      };
      getWXSign(data).then(res => {
        wx.config({
          debug: configs.wxDebug,
          appId: data.appid,
          timestamp: res.timestamp,
          nonceStr: res.noncestr,
          signature: res.signature,
          jsApiList: [
            'scanQRCode',
            'hideAllNonBaseMenuItem',
            'startRecord',
            'stopRecord',
            'translateVoice',
            'closeWindow',
            'chooseWXPay'
          ]
        });
        console.log(res);
        wx.ready(function(res){
          // wx.hideAllNonBaseMenuItem();
        })
        wx.error(function(res){
          console.log(res);
        })
      })
    }
  }
}

</script>

<style lang="less" scoped>
@baseS: 75;
.loading{
    background:url(./assets/loading.svg) center center no-repeat;
    width: 100%;
    height: 100%;
    transform: scale(0.2);
    position: fixed;
  };
  #urlImg{
    height: 960/@baseS*1rem;
    width: auto;
    position: absolute;
    margin: auto;
    top: 0; left: 0; right: 0; bottom: 0;
    overflow: auto;
  }
</style>