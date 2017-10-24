<template>
  <div id="ButtonControl">
    <div class="header">
      <span class="movie">
        <img src="../../assets/images/返回.png"  @click="back()">
      </span>
      <span class="scan">
        <img src="../../assets/images/扫一扫.png" @click="scan()">
      </span>
      <span class="tv">
        <img src="../../assets/images/直播.png"  @click="btnPressedUp(keyCode.TV)">
      </span>
    </div>
    <div class="volControl">
      <div class="volBtn_1" v-on:touchstart="btnTaped(keyCode.VolDown)" v-on:touchend="btnPressedUp(keyCode.VolDown)"></div>
      <div class="volBtn_3" v-on:touchstart="btnTaped(keyCode.Mute)" v-on:touchend="btnPressedUp(keyCode.Mute)"></div>
      <div class="volBtn_2" v-on:touchstart="btnTaped(keyCode.VolUp)" v-on:touchend="btnPressedUp(keyCode.VolUp)"></div>
      <img src="../../assets/images/音量.png" v-show="key != keyCode.VolUp && key != keyCode.Mute && key != keyCode.VolDown">
      <img src="../../assets/images/加.png" v-show="key == keyCode.VolUp">
      <img src="../../assets/images/vol_pressed.png" v-show="key == keyCode.Mute">
      <img src="../../assets/images/减.png" v-show="key == keyCode.VolDown">
    </div>
    <div class="centerControl">
      <div class="upBtn" v-on:touchstart="btnTaped(keyCode.Up)" v-on:touchend="btnPressedUp(keyCode.Up)"></div>
      <div class="leftBtn" v-on:touchstart="btnTaped(keyCode.Left)" v-on:touchend="btnPressedUp(keyCode.Left)"></div>
      <div class="okBtn" v-on:touchstart="btnTaped(keyCode.Ok)" v-on:touchend="btnPressedUp(keyCode.Ok)"></div>
      <div class="rightBtn" v-on:touchstart="btnTaped(keyCode.Right)" v-on:touchend="btnPressedUp(keyCode.Right)"></div>
      <div class="downBtn" v-on:touchstart="btnTaped(keyCode.Down)" v-on:touchend="btnPressedUp(keyCode.Down)"></div>
      <img src="../../assets/images/ctrl_1.png" v-show="key != keyCode.Up && key != keyCode.Left && key != keyCode.Ok && key != keyCode.Right && key != keyCode.Down">
      <img src="../../assets/images/up_1.png" v-show="key == keyCode.Up">
      <img src="../../assets/images/left_1.png" v-show="key == keyCode.Left">
      <img src="../../assets/images/OK_1.png" v-show="key == keyCode.Ok">
      <img src="../../assets/images/right_1.png" v-show="key == keyCode.Right">
      <img src="../../assets/images/down_1.png" v-show="key == keyCode.Down">
    </div>
    <div class="footer">
      <span class="menu">
        <div class="menuBtn" v-on:touchstart="btnTaped(keyCode.Menu)" v-on:touchend="btnPressedUp(keyCode.Menu)"></div>
        <img src="../../assets/images/menu.png"  v-show="key != keyCode.Menu">
        <img src="../../assets/images/menu_pressed.png" v-show="key == keyCode.Menu">
      </span>
      <span class="return">
        <div class="returnBtn" v-on:touchstart="btnTaped(keyCode.Back)" v-on:touchend="btnPressedUp(keyCode.Back)"></div>
        <img src="../../assets/images/back.png" v-show="key != keyCode.Back">
        <img src="../../assets/images/back_pressed.png" v-show="key == keyCode.Back">
      </span>
    </div>
    <audio id="audio" src="./static/assets/tink.wav"></audio>
  </div>
</template>

<<script>

import common from '@/common/js/common.js'
import {keyCodes} from '../../data/staticData.js'

export default {
  name: 'ButtonControl',
  data: function () {
      return{
        key:-1,
        keyCode: keyCodes,
      }
  },
  created: function () {
    common.setDocumentTitle('遥控器');
    document.querySelector('body').ontouchmove = function(e) {
      e.preventDefault();
    }
  },
  deactivated:function(){
    document.querySelector('body').ontouchmove = null;
  },
  methods: {
    back() {
      window.history.go(-1)
    },
    scan: function() {
      console.log('scan pressed');
      wx.scanQRCode({
        needResult: 0,
        scanType: ['qrCode'],
        success: function(res){

        },
        cancel: function(){

        }
      })
    },
    btnTaped: function(keyCode) {
      this.key = keyCode;
      console.log('touchstart');

    },
    btnPressedUp: function(keyCode) {
      console.log('touchend');
      let audio = document.querySelector('#audio');
      audio.currentTime = 0;
      audio.play();
      let data = {
         'keyCode': keyCode
       }
      common.sendRemoteControlEvent(data,"keyEvent")
      this.key = -1
      
    },
    translateVoice: function(localId) {
      wx.translateVoice({
        localId: localId,
        isShowProgressTips: 1,
        success: res => {
          console.log(res);
          let translateText = res.translateResult ? res.translateResult.replace('。','') : 'None';
          console.log(translateText);
          this.$refs.search.searchMovie(translateText);
          this.isShowResult.flag = true;
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @baseS: 75;
  .gotoLink{
    width: 10%;
    padding: 10px;
    height: 8%;
    position: absolute;
    z-index: 9;
  }
  .record img{
    left: 43%;
    width: 12%;
    position: absolute;
    bottom: 5%;
    user-select:none;
  }
  .tv img, .tv .gotoLink{
    right: 0;
  }
  .scan img, .scan .gotoLink{
    left:42%;
    top:0.5%;
  }
  .header img{
    width: 10%;
    padding: 10px;
    position: absolute;
  }
  .volBtn_1{
    height: 8%;
    position: absolute;
    width: 24%;
    left: 20%;
    z-index: 9;
    top: 16%;
  }
  .volBtn_2{
    height: 8%;
    position: absolute;
    width: 24%;
    right: 20%;
    z-index: 9;
    top: 16%;
  }
  .volBtn_3{
    height: 8%;
    position: absolute;
    width: 12%;
    left: 44%;
    z-index: 9;
    top: 16%;
  }
  .volControl img{
    width: 60%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    user-select:none;
    top:16%;
  }
  .upBtn{
    width: 60%;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top:38%;
    height: 17%;
    z-index: 9;
  }
  .downBtn{
    width: 60%;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 70%;
    height: 16%;
    z-index: 9;
  }
  .leftBtn{
    width: 68%;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 0;
    top: 54%;
    height: 18%;
    z-index: 9;
  }
  .okBtn{
    width: 30%;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 54%;
    height: 17%;
    z-index: 9;
  }
  .rightBtn{
    width: 32%;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 82%;
    top: 54%;
    height: 18%;
    z-index: 9;
  }
  .centerControl, .header, .record{
    user-select:none;
  }
  .centerControl img{
    width: 80%;
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 54%;
  }
  .menu img, .return img{
    width: 36%;
    position: absolute;
    bottom: 5%;
  }
  .recordBtn{
    width: 18%;
    position: absolute;
    bottom: 4%;
    left: 40%;
    height: 12%;
    z-index: 9;
  }
  .menuBtn{
    width: 36%;
    position: absolute;
    bottom: 5%;
    left: 9%;
    height: 8%;
    z-index: 9;
  }
  .returnBtn{
    width: 36%;
    position: absolute;
    bottom: 5%;
    right: 9%;
    height: 8%;
    z-index: 9;
  }
  .return img{
    right: 9%;
  }
  .menu img{
    left:9%;
  }
  .recording{
    width: 80%;
    height: 50%;
    position: fixed;
    // background-color: rgba(0,0,0,0.2);
    color:#900;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 46%;
    height: 30%;
    top: 50%;
    font-size: 18px;
  }
  .recording img{
    width: 100%;
  }
</style>
