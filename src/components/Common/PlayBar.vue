<template>
    <div class="ControlBar">
      <img src="../../assets/images/快退.png" @click="keyEvent(keyCode.Left)"></img>
      <img src="../../assets/images/视频播放.png" @click="playMedia()"></img>
      <img src="../../assets/images/快进.png" @click="keyEvent(keyCode.Right)"></img>
    </div> 
</template>

<script>
import common from '@/common/js/common.js'
import {keyCodes,configs} from '@/data/staticData.js'

export default {
  name: 'PlayBar',
  data() {
      return{
          keyCode:keyCodes,
          MediaInfo:{
              type:'Movie'
          }
      }
  },
  created() {

  },
  methods: {
    keyEvent(keyCode){
      let data = {
         'keyCode': keyCode
       }
      common.sendRemoteControlEvent(data,"keyEvent")
    },
    playMedia() {
      let data = {
        'movieID': this.movie.ID
      }
      common.sendRemoteControlEvent(data,'playMovie')
    }
  }
}
</script>

<style lang="less" scoped>
  @baseS: 75;
.ControlBar{
    width: 100%;
    height: 120/@baseS*1rem;
    text-align: center;
    position: fixed;
    background-color: rgb(21,25,15);
    bottom: 0;
  }
  .ControlBar img{
    width: auto;
    height: 80/@baseS*1rem;
    margin: 20/@baseS*1rem;
    margin-left: 60/@baseS*1rem;
    margin-right: 60/@baseS*1rem;
    background: center center no-repeat;
    background-size: contain;
  }
</style>


