<template>
  <div class="ErrorTip" :class="{showing: errorTipInfo.isShow}" ref="ErrorTip">
    <p class="content" @click="gotoScan()">{{errorTipInfo.errorContent}}</p>
  </div>
</template>
<script>

export default {
  name: 'ErrorTip',
  props: ['errorTipInfo'],
  data: function() {
    return {
    }
  },
  methods:{
    gotoScan() {
      console.log('scan pressed');
      let data = {
        'content': errorTipInfo.errorContent
      }
      common.sendRemoteControlEvent(data,'clickScan')
      wx.scanQRCode({
        needResult: 0,
        scanType: ['qrCode'],
        success: function(res){
          let data = res
          common.sendRemoteControlEvent(data,'scanQRCode')
        },
        cancel: function(){

        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @baseS: 75;

  .ErrorTip{
    position: fixed;
    width: 100%;
    height: 140/@baseS*1rem;
    background-color: black;
    opacity: 0.8;
    z-index: 100;
    transform: translate3d(0,-100%,0);
    transition: transform 0.6s ease-out;
  }
  .showing{
    transform: translate3d(0,0,0);
  }
  .content{
    width: 100%;
    height: 100%;
    text-align: center;
    color: white;
    position: absolute;
    font-size: 16px;
    line-height: 140/@baseS*1rem;
  }

</style>
