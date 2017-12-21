<template>
  <div class="Main">
    <MainTitle></MainTitle>
    <MainMovie v-show="mainContentType == 'showMovie'"></MainMovie>
    <MainLive v-show="mainContentType == 'showLive'"></MainLive>
    <ControlTip></ControlTip>
    <!-- <PlayBar></PlayBar> -->
  </div>
</template>

<script>

import common from '@/common/js/common.js'
import Bus from '@/common/js/bus.js'
import {getResources} from '@/api/service.js'
import TabBar from '@/components/Common/TabBar.vue'
import ControlTip from '@/components/Common/ControlTip.vue'
import MainMovie from '@/components/Main/MainMovie.vue'
import MainLive from '@/components/Main/MainLive.vue'
import MainTitle from '@/components/Main/MainTitle.vue'
import {configs} from '@/data/staticData.js'
import PlayBar from '@/components/Common/PlayBar.vue'


export default {
  name: 'Main',
  components: {
    ControlTip,
    MainLive,
    MainMovie,
    MainTitle,
    PlayBar
  },
  data() {
      return{
        movieList: [],
        movieInfo:{},
        hasLive:configs.hasLive,
        hasMovie:configs.hasMovie,
        mainContentType:''
      }
  },
  created() {
    if(this.hasMovie){
      this.mainContentType = 'showMovie'
      this.titleBarType = 'showMovie'
    }else if(this.hasLive){
      this.mainContentType = 'showLive'
    }else{
      this.$router.push({name:configs.controlType})
    }
    Bus.$on('mainContent',type =>{
      this.mainContentType = type
    })
  },
  activated() {
    common.setDocumentTitle('手机遥控器')
    // document.querySelector('body').scrollTop = localStorage.getItem('moviePostion');
    // document.getElementById('movietag').scrollLeft = localStorage.getItem('tagPostion');
    // document.getElementById('controltip').style.left = "0px";
    // document.getElementById('controltip').style.top = "0px";
  }
}
</script>

<style lang="less" scoped>
@baseS: 75;
  .Main{
    height: 100%;
    width: 100%;
    color: #ffffff;
  }
</style>

