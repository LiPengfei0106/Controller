<template>
  <div class="MovieDetail">
      <div @click="back()">返回</div>
      <img v-lazy="movie['PicURL_ABS']" lazy="loaded" class="moviePoster"></img>
      <div>{{movie.Name['zh-CN']}}</div>
      <div>{{movie.Introduce['zh-CN']}}</div>
      <button  @click="playMovie(movie.ID)">播放</button>
      <button  @click="newMovieOrder(movie)">购买单部</button>
      <button>购买全部</button>
  </div>
</template>

<<script>

import common from '@/common/js/common.js'
import {remotePay} from '@/api/service.js'

export default {
  name: 'MovieDetail',
  data() {
      return{
        movie: {}
      }
  },
  activated() {
    this.movie = this.$route.params
    common.setDocumentTitle(this.movie.Name['zh-CN'])
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
    newMovieOrder(movie){
      common.addNewMovieOrder(movie)
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