<template>
  <div id="Login">    
    <div class="qrcode">
      <img id="urlImg" />
    </div>
  </div>
</template>

<<script>

import common from '@/common/js/common.js'
import {getWxParams, checkWxSubs,getRemoteSubscribeURL, bindTVDevice, getTVDeviceId, getWXSign} from '@/api/service.js'

export default {
  name: 'Login',
  data () {
      return{
        deviceid:'remote_control$888$123456789',
        projectid:'remote_control',
        needGetDeviceID: false
      }
  },
  created() {
      common.setDocumentTitle('遥控器');
  },
  mounted() {
    console.log("mounted")
    common.showLoading(true)
    this.init();
  },
  methods: {
    init(){
      if(this.$route.params.state){
        if(this.$route.params.state == 'gettvdeviceid'){
          this.needGetDeviceID = true
        }else{
          this.deviceid = this.$route.params.state.split(';')[0]
          this.projectid = this.deviceid.split('$')[0]
        }
        localStorage.setItem('deviceid', this.deviceid);
        localStorage.setItem('projectid', this.projectid);
      }
      if(sessionStorage.getItem('clear_session')){
        this.checkSubscribe()
      }else{
        this.getClearSession()
      }
        
    },
    getClearSession(){
      let params = {
        'appid': this.$route.params.appid,
        'code': this.$route.params.code
      }
      getWxParams(params).then(res => {
        if(!res['clear_session']){
          this.showRedirectUrl()
          return;
        }
        localStorage.setItem('userid', res.userid);
        localStorage.setItem('openid', res.openid);
        sessionStorage.setItem('clear_session', res['clear_session']);
        this.bindTV()
      }).catch ( error => {
        console.log(error)
        this.showRedirectUrl()
      })
    },
    bindTV(){
      if(this.needGetDeviceID){
        this.getTVDeviceID()
      }else{
        this.bindTVDeviceID()
      }
    },
    getTVDeviceID(clear_session) {
      let getParams = {
        'clear_session': sessionStorage.getItem('clear_session')
      };
      getTVDeviceId(getParams).then(res => {
        if(res.rescode == '200'){
          this.deviceid = res.deviceid;
          this.projectid = this.deviceid  ? this.deviceid.split('$')[0] : 'remote_control';
          localStorage.setItem('projectid', this.projectid);
          localStorage.setItem('deviceid', this.deviceid);
          this.checkSubscribe();
        }else{
          alert('网络错误');
          wx.closeWindow();
        }
      })
    },
    bindTVDeviceID(clear_session) {
      let bindParams = {
        'clear_session': sessionStorage.getItem('clear_session'),
        'deviceid': sessionStorage.getItem('deviceid'),
      }
      bindTVDevice(bindParams).then(res => {
        if(res.rescode == '200') {
        console.log('绑定成功');
        this.checkSubscribe();
        }else{
          console.log('绑定失败');
        }
      })
    },
    checkSubscribe(){
      var params = {
        'clear_session': sessionStorage.getItem('clear_session'),
        'lang': 'zh_CN'
      }
      checkWxSubs(params).then(res => {
        let isSubscribe = res['subscribe']
        localStorage.setItem('isSubscribe', isSubscribe);
        if(isSubscribe == 1) {
          this.$router.push({name:'MovieList'})
        }else{
          this.showRedirectUrl()
        }
      })
      this.getWxSignature();
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
        console.log(res.signature);
        wx.ready(function(res){
          // wx.hideAllNonBaseMenuItem();
        })
        wx.error(function(res){
          console.log(res);
        })
      })
    },
    showRedirectUrl() {
      console.log('showRedirectUrl');
      let params = {
        'projectID': localStorage.getItem('projectid')
      }
      getRemoteSubscribeURL(params).then(res => {
        common.showLoading(false)
        let result = res;
        let urlType = res.urlType;
        var urlImg = document.getElementById("urlImg");
        if(result.rescode == '200' && urlType == 'image'){
          urlImg.setAttribute("src", result.subscribeurl);
        }else{
          console.log('show default');
          urlImg.setAttribute("src", "http://mres.cleartv.cn/default/18c63459a2c069022c7790430f761214_150596215158.png");
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @baseS: 75;
  // .loading{
  //   background:url(../assets/loading.svg) center center no-repeat;
  //   width: 100%;
  //   height: 100%;
  //   transform: scale(0.2);
  //   position: absolute
  // }
  // .qrcode{
  //   height: 100%;
  //   width: 100%;
  //   position: absolute;
  //   background: center center no-repeat;
  //   background-size: contain;
  // }
  #urlImg{
    height: 960/@baseS*1rem;
    width: auto;
    position: absolute;
    margin: auto;
    top: 0; left: 0; right: 0; bottom: 0;
    overflow: auto;
  }
</style>
