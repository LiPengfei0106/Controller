<template>
  <div class="MovieDetail">
      <div @click="back()">返回</div>
      <img v-lazy="movie['PicURL_ABS']" lazy="loaded" class="moviePoster"></img>
      <div>{{movie.Name['zh-CN']}}</div>
      <div>{{movie.Introduce['zh-CN']}}</div>
      <button @click="playMovie(movie.ID)">播放</button>
      <button v-show="showPay" @click="newMovieOrder()">购买单部</button>
      <button v-show="showPay" @click="newAllMovieOrder()">购买全部</button>
  </div>
</template>

<<script>

import common from '@/common/js/common.js'
import {remotePay} from '@/api/service.js'

export default {
  name: 'MovieDetail',
  data() {
      return{
        movie: {
          'ID':0,
          'Name':{
            'zh-CN':'',
            'en-US':''
          }
        },
        allMovie: {
          'ID':-1,
          'Name':{
            'zh-CN':'全部电影',
            'en-US':'All Movie'
          }
        },
        showPay: false,
        isActivated: false
      }
  },
  activated() {
    this.isActivated = true
    this.movie = this.$route.params
    this.movie['fee'] = this.movie.singleFee
    this.allMovie['fee'] = this.movie.packageFee
    common.setDocumentTitle(this.movie.Name['zh-CN'])
    this.checkMovie()
  },
  deactivated() {
    this.isActivated = false
  },
  methods: {
    back() {
      window.history.go(-1)
    },
    playMovie(ID) {
      let data = {
        'movieID': ID
      }
      common.sendRemoteControlEvent(data,'playMovie')
    },
    newMovieOrder(){
      common.addNewMovieOrder(this.movie)
    },
    newAllMovieOrder(){
      common.addNewMovieOrder(this.allMovie)
    },
    checkMovie(){
      let params = common.getMoviePayParams(this.movie,"playCheck")
      remotePay(params).then(res => {
        console.log(res)
        if(res.rescode == '200'){
          if(res.data.canPlay == 0){
            this.showPay = true
            if(this.isActivated)
              setTimeout(() =>{this.checkMovie()}, 3000)
          }else{
            this.showPay = false
          }
        }
      }).catch(error => {
        console.log(error)
        this.showPay = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @baseS: 75;
  .MovieDetail{
    height: 100%;
    width: 100%;
    background: #fff;
  }
  .moviePoster{
    width: 33%;
    height: 360/@baseS*1rem;
    margin: 20/@baseS*1rem;
  }
</style>