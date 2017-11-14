<template>
  <div id="app">
    <ErrorTip :error-tip-info='errorTipInfo' ref="ErrorTip"></ErrorTip>
    <div class='loading' v-show='isShowLoading'></div>
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
      isShowLoading:false
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
      console.log('init')
      console.log(urlParams)
      localStorage.setItem('appid', urlParams.appid)
      if(configs.needLogin){
        this.$router.push({name:'Login',params: {appid:urlParams.appid,code:urlParams.code,state:urlParams.state}})
      }else{
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
    }
  }
}

</script>

<style lang="less" scoped>
.loading{
    background:url(./assets/loading.svg) center center no-repeat;
    width: 100%;
    height: 100%;
    transform: scale(0.2);
    position: absolute;
  }
</style>