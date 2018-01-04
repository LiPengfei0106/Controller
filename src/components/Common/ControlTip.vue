<template>
  <div class="ControlTip">
    <a class="remoteControl">
       <img id="controltip" class="remoteImg" src="../../assets/images/miniControl.png" @click="gotoLink()" v-on:touchstart="drag($event)" v-on:touchmove="throttle(move($event), 50, 100)" v-on:touchend="end($event)">
     </a>
  </div>
</template>
<script>

import {configs} from '@/data/staticData.js'
import common from '@/common/js/common.js'

export default {
 name: 'ControlTip',
 data: function() {
   return {
     flag: false,
     cur: {
       x:0,
       y:0,
     },
     temp:{
       nx:0,
       ny:0,
       dx:0,
       dy:0,
       x:0,
       y:0
     }
   }
 },
 methods: {
   gotoLink: function(){
     console.log('clicked');
     let data = {
        'content': 'ControlTip'
      }
      common.sendRemoteControlEvent(data,'clickButton')
      this.$router.push({name:configs.controlType})
   },
   checkBorder: function(){
     let imgWidth = document.querySelector('.remoteImg').width;
     let imgHeight = document.querySelector('.remoteImg').height;
     let width = 0 - document.body.clientWidth + 1.8 * imgWidth;
     let height = 0 - document.body.clientHeight + 3.2 * imgHeight;
     let temp = this.temp;
     if(temp.x < width){
       temp.x = width;
       temp.y > 40 ? temp.y = 40 : (temp.y < height ? temp.y = height : '');
     }else if(temp.x > 10){
       temp.x = 10;
       temp.y > 40 ? temp.y = 40 : (temp.y < height ? temp.y = height : '');
     }else if(temp.y > 20){
       temp.y = 40;
       temp.x > 10 ? temp.x = 10 : (temp.x < width ? temp.x = width : '');
     }else if(temp.y < height){
       temp.y = height;
       temp.x > 10 ? temp.x = 10 : (temp.x < width ? temp.x = width : '');
     }
   },
   drag: function(event){
    //  event.preventDefault();
     console.log('start')
     let ele = event.currentTarget;
     let touch = event.touches[0];
     let cur = this.cur;
     let temp = this.temp;
     this.flag = true;
     cur.x = touch.clientX;
     cur.y = touch.clientY;
     temp.dx = ele.offsetLeft;
     temp.dy = ele.offsetTop;
   },
   move: function(event){
     event.preventDefault();
     console.log('move');
     let temp = this.temp;
     let cur = this.cur;
     let ele = event.currentTarget;
     let touch = event.touches[0];
     if(this.flag){
       temp.nx = touch.clientX - cur.x;
       temp.ny = touch.clientY - cur.y;
       temp.x = temp.dx + temp.nx;
       temp.y = temp.dy + temp.ny;
       this.checkBorder();
       ele.style.left = temp.x + 'px';
       ele.style.top = temp.y + 'px';
     }
   },
   end: function(event){
      console.log('end')
      this.flag = false;
   },
   throttle: function(fn, delay, mustRunDelay){
      var timer=null;
      var t_start;
      return function(){
        var context=this,args=arguments,t_curr=+new Date();
        clearTimeout(timer);
        if(!s_start){
            t_start=t_curr;
        }if(t_curr-t_start>=mustRunDelay){
            fn.apply(context,args);
            t_start=t_curr;
        }else{
            timer=setTimeout(function(){
                fn.apply(context,args);
            },delay);
        }
      }
   }
 }
}
</script>

<style lang="less">
  @baseS: 75;
  .remoteControl{
    position: fixed;
    transform: translateZ(0px);
    will-change: transform;
    right: 30vw;
    bottom:43vw;
    z-index: 10;
  }
  .remoteControl img {
    width:140/@baseS*1rem;
    position: absolute;
  }

</style>