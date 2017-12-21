<template>
  <div class="MovieList">
    <div class="mainContent">
      <div class="movieItem" v-for="movie in myMovieList" @click="playMovie(movie)">
        <img v-lazy="movie['PicURL_ABS']" lazy="loaded" class="moviePoster"></img>
        <div class="movieDetail">
          <span class="movieName">{{movie.Name['zh-CN']}}</span>
          <span class="movieScore">{{movie.Score}}</span>
          <span class="movieIntro">{{movie.Introduce['zh-CN']}}</span>
        </div>
      </div>
      <div class="contentBottom">已经到底啦</div>
    </div>
  </div>
</template>

<script>

import common from '@/common/js/common.js'
import {getResources} from '@/api/service.js'
import {configs} from '@/data/staticData.js'
import Bus from '@/common/js/bus.js'


export default {
  name: 'MovieList',
  data() {
      return{
        movieInfo:{},
        hasLive:configs.hasLive,
        myMovieList:[]
      }
  },
  created() {
    Bus.$on('movieList',movieInfo =>{
      this.myMovieList = movieInfo
    })
  },
  mounted() {
    console.log("mounted")
    this.initData();
  },
  methods: {
    async initData(){
      console.log("initData")
      this.checkMovieInfo()
    },
    async checkMovieInfo(){
      common.showLoading(true)
      let params = {
        'action': 'checkVersion',
        'projectID': localStorage.getItem('projectName')
      }
      getResources(params).then(res => {
        console.log("checkMovieInfo")
        console.log(res)
        this.movieInfo = res.data;
      })
    },
    playMovie(movie) {
      common.playAudio();
      let data = {
        'movieID': movie.ID
      }
      common.sendRemoteControlEvent(data,'playMovie')
    },
    showMovieDetail(movie){
      console.log("showMovieDetail")
      movie['singleFee'] = movie.Price * this.movieInfo.feeDiscount
      movie['packageFee'] = this.movieInfo.packageFee * 100
      console.log(movie)
      this.$router.push({ name:'MovieDetail', params: movie})
    }
  }
}
</script>

<style lang="less" scoped>
@baseS: 75;
  .loading{
    background:url(../../assets/loading.svg) center center no-repeat;
    width: 100%;
    height: 100%;
    transform: scale(0.2);
    position: absolute;
  }
  .mainContent{
    -webkit-overflow-scrolling: touch;
    width: 100%;
    overflow: auto;
    position: absolute;
    padding-top:  90/@baseS*1rem;
  }
  .movieItem{
    height: 260/@baseS*1rem;
    margin: 20/@baseS*1rem;
    padding: 12/@baseS*1rem;
    position: relative;
    vertical-align: middle;
    border-radius: 10/@baseS*1rem;
    color: rgb(175,175,175);
    background-color: rgba(255,255,255,.05);
    overflow: hidden;
  }
  .moviePoster{
    height:100%;
    width: 180/@baseS*1rem;
    border-radius: 10/@baseS*1rem;
    opacity: 0;
    -webkit-transition: opacity 0.25s ease-in-out;
    -moz-transition: opacity 0.25s ease-in-out;
    -o-transition: opacity 0.25s ease-in-out;
    transition: opacity 0.25s ease-in-out;
  }
  .movieDetail{
    position: absolute;
    top: 0px;
    left: 200/@baseS*1rem;
    bottom: 0px;
    right: 0px;
    float: right
  }
  img[lazy=loaded]{
    opacity: 1;
  }
  .movieName{
    margin-top: 20/@baseS*1rem;
    display: block;
    margin-left: 20/@baseS*1rem;
    line-height: 1.5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 48/@baseS*1rem;
  }
  .movieScore{
    margin: 0;
    line-height:1;
    display: block;
    margin-left: 20/@baseS*1rem;
    font-style:italic;
    margin:27rpx 0;
    font-size: 40/@baseS*1rem;
    color: rgb(255,150,0);
  }
  .movieIntro{
    margin-top: 20/@baseS*1rem;
    margin-left: 20/@baseS*1rem;
    // text-indent: 20/@baseS*1rem;
    overflow-x: hidden;
    // white-space: nowrap;
    line-height: 1.5;
    // text-overflow: ellipsis;
    display: block;
    font-size: 36/@baseS*1rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
</style>

