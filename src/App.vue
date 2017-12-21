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
import {getWxParams, checkWxSubs,getRemoteSubscribeURL, getWXSign,getResources} from '@/api/service.js'


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
        showTime:3
      },
      isShowLoading:false,
      deviceID:'deviceid',
      projectName:'demo',
      deviceAlias:'devicealias',
      deviceIP:'192.168.17.217:40106',
      time: '123123123123'
    }
  },
  beforeCreate: function() {
    common.initApp(this)
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      console.log('APP init')
      console.log(urlParams)
      localStorage.setItem('appid', urlParams.appid)
      if(configs.needLogin){
        console.log('needLogin')
        if(urlParams.appid && urlParams.code && urlParams.state){
          this.checkProject(urlParams.appid,urlParams.code,urlParams.state)
        }else{
          console.log('没有登录所需要的Params')
          common.showRedirectUrl()
        }
      }else{
        console.log('不用登录')
        if(configs.remoteType == 'WeiXin_proxy'){
          this.projectName = 'demo';
          this.regID = 'registerid';
          this.deviceAlias = 'devicealias';
          this.deviceIP = '192.168.17.216:40106';
          common.initWildDog(this.regID)
          localStorage.setItem('projectName', this.projectName);
          localStorage.setItem('deviceAlias', this.deviceAlias);
          localStorage.setItem('regID', this.regID);
          localStorage.setItem('deviceIP', this.deviceIP);
          this.$router.push({name:'Main'});
          return;
        }
        
        if(!urlParams.deviceid)
          urlParams.deviceid = 'demo$888$123456789'
        if(!urlParams.projectid)
          urlParams.projectid = 'demo'
        localStorage.setItem('deviceid', urlParams.deviceid);
        localStorage.setItem('projectid', urlParams.projectid);
        if(configs.hasMovie)
          this.$router.push({name:'MovieList'})
        else if(configs.hasLive)
          this.$router.push({name:'LiveList'})
        else
          this.$router.push({name:'ButtonControl'})
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
    checkProject(appid,code,state){
      console.log('checkProject');
      console.log('appid:'+appid);
      console.log('code:'+code);
      console.log('state:'+state);
      localStorage.setItem('appid', appid);
      if(state == 'getdeviceid'){
        console.log('读取缓存')
        this.projectName = localStorage.getItem('projectName');
        this.regID = localStorage.getItem('regID');
        this.deviceAlias = localStorage.getItem('deviceAlias');
        this.deviceIP = localStorage.getItem('deviceIP');
        if(!projectName){
          console.log('没有缓存')
          this.projectName = 'demo'
        }
      }else if((state.split('$')).length > 2){
        console.log('老的极光的参数')
        this.deviceAlias = state.split(';')[0]
        this.projectName = this.deviceAlias.split('$')[0]
        this.regID = 'unknow';
        this.deviceIP = '0.0.0.0';

        localStorage.setItem('projectName', this.projectName);
        localStorage.setItem('deviceAlias', this.deviceAlias);
        localStorage.setItem('regID', this.regID);
        localStorage.setItem('deviceIP', this.deviceIP);
      }else{
        let decodedData = window.atob(state).split(';');
        if(decodedData.length > 3){
          console.log('新的参数')
          console.log(decodedData);
          this.deviceAlias = state
          this.projectName = decodedData[0];
          this.regID = decodedData[1];
          this.deviceIP = decodedData[2];
          this.time = decodedData[3];

          localStorage.setItem('projectName', this.projectName);
          localStorage.setItem('regID', this.regID);
          localStorage.setItem('deviceAlias', this.deviceAlias);
          localStorage.setItem('deviceIP', this.deviceIP);
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
          common.initWildDog(this.regID)
        }else{

        }
        if(sessionStorage.getItem('clear_session')){
          this.checkSubscribe()
        }else{
          this.getClearSession(appid,code)
        }
        // this.$router.push({name:'Login',params: {appid:appid,code:code,state:state}})
      })
    },
    getClearSession(appid,code){
      console.log('getClearSession');
      let params = {
        'appid': appid,
        'code': code
      }
      getWxParams(params).then(res => {
        console.log(res);
        if(!res['clear_session']){
          common.showRedirectUrl(this.projectName)
          return;
        }
        localStorage.setItem('userid', res.userid);
        localStorage.setItem('openid', res.openid);
        sessionStorage.setItem('clear_session', res['clear_session']);
        this.checkSubscribe()
        this.getWxSignature();
      }).catch ( error => {
        console.log(error)
        common.showRedirectUrl(this.projectName)
      })
    },
    checkSubscribe(){
      console.log('checkSubscribe');
      var params = {
        'clear_session': sessionStorage.getItem('clear_session'),
        'lang': 'zh_CN'
      }
      checkWxSubs(params).then(res => {
        console.log(res);
        let isSubscribe = res['subscribe']
        localStorage.setItem('isSubscribe', isSubscribe);
        if(isSubscribe == 1) {
          // TODO
          if(configs.remoteType == 'WeiXin_proxy'){
            console.log("新的遥控器界面");
            this.$router.push({name:'Main'})
          }else{
            console.log("默认旧的遥控器界面");
            if(configs.hasMovie)
              this.$router.push({name:'MovieList'})
            else if(configs.hasLive)
              this.$router.push({name:'LiveList'})
            else{
              common.showLoading(false)
              this.$router.push({name:configs.controlType})
            }
          }
        }else{
          common.showRedirectUrl(this.projectName)
        }
      })
      
    },
    getWxSignature () {
      console.log('getWxSignature');
      let data = {
        appid: localStorage.getItem('appid'),
        clear_session: sessionStorage.getItem('clear_session'),
        url: window.location.href.split('#')[0]
      };
      getWXSign(data).then(res => {
        wx.config({
          debug: false,
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