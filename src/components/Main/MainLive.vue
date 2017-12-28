<template>
  <div id="LiveList">
    <div class="mainContents">
      <div class="channelBox" v-for="(live, index) in liveList" @click="playLive(index)">
        <div class="channelContent">
          <div class="imgContent" v-lazy:background-image="live.ChannelPicURL">
          </div>
          <span class="channelName">{{live.ChannelName['zh-CN']}}</span>
        </div>
      </div>
      <div class="contentBottom">已经到底啦</div>
    </div>
  </div>
</template>

<script>

import common from '@/common/js/common.js'
import {getResources} from '@/api/service.js'
import {configs,data} from '@/data/staticData.js'

export default {
  name: 'LiveList',
  data () {
      return{
        liveList: [],
        hasMovie: configs.hasMovie
      }
  },
  activated() {
    // common.setDocumentTitle('看直播');
    // document.querySelector('body').scrollTop = localStorage.getItem('livePosition');
    // document.getElementById('controltip').style.left = "0px";
    // document.getElementById('controltip').style.top = "0px";
  },
  mounted() {
    this.getLiveLists();
  },
  deactivated() {
    localStorage.setItem('livePosition',document.querySelector('body').scrollTop);
  },
  methods: {
    getLiveLists () {
      common.showLoading(true)
      let params = {
        'action': 'getLiveList',
        'projectID': localStorage.getItem('projectName')
      };
      getResources(params).then(res => {
        common.showLoading(false)
        this.liveList = res.data;
      })
    },
    playLive (index) {
      common.playAudio();
      let data = {'channelIndex':index}
      common.sendRemoteControlEvent(data,"playLive")
    }
  }
}
</script>

<style lang="less" scoped>

   @baseS: 75;

  .header{
    height: 40px;
    background-color: #6495ED;
    color: #fff;
    text-align: center;
    font-size: 16px;
  }
  .mainContents{
    top:0;
    bottom: 1.6rem;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    z-index: 1;
    user-select: none;
    padding-top:  90/@baseS*1rem;
  }
  .channelBox{
    border-radius:9px;
    margin:30/@baseS*1rem;
    height: 140/@baseS*1rem;
    color:rgb(245,245,245);
    background-color: rgba(255,255,255,.1)
  }
  .channelContent{
    height: 100%;
    position: relative;
  }
  .imgContent{
    height: 80/@baseS*1rem;
    width: 80/@baseS*1rem;
    left:15px;
    position: absolute;
    top:15px;
    background: center center no-repeat;
    background-size: contain;
  }
  .tvIcon{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 6%;
    width: 6%;
  }
  .channelName{
    display: inline-block;
    position: absolute;
    top: 0;
    left:150/@baseS*1rem;
    font-size: 18px;
    line-height:140/@baseS*1rem;
  }
  .tapped{
    opacity: 0.5;
  }
</style>