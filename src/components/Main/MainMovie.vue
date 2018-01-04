<template>
  <div class="MovieList">
    <div class="mainContent">
      <div class="movieItem" v-for="movie in myMovieList" @click="playMovie(movie)">
        <div class="moviePoster">
          <img v-lazy="movie['PicURL_ABS']" lazy="loaded"/>
          <span class="movieScore">{{movie.Score}}</span>
        </div>
        <div class="movieDetail">
          <span class="movieName">{{movie.Name['zh-CN']}}</span>
          <span class="movieActor">{{movie.Actor['zh-CN']}}</span>
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
    padding-top:  170/@baseS*1rem;
  }
  .movieItem{
    height: 262/@baseS*1rem;
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
    height:260/@baseS*1rem;
    width: 180/@baseS*1rem;
  }
  .moviePoster img{
    height:262/@baseS*1rem;
    width: 180/@baseS*1rem;
    border-radius: 10/@baseS*1rem;
    opacity: 0;
    -webkit-transition: opacity 0.25s ease-in-out;
    -moz-transition: opacity 0.25s ease-in-out;
    -o-transition: opacity 0.25s ease-in-out;
    transition: opacity 0.25s ease-in-out;
    position: absolute
  }
  .movieScore{
    width: 160/@baseS*1rem;
    padding-top: 10/@baseS*1rem;
    text-align: right;
    font-style:italic;
    font-size: 24/@baseS*1rem;
    color: rgb(255,150,0);
    text-shadow: black 3/@baseS*1rem 3/@baseS*1rem 3/@baseS*1rem;
    position: absolute
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
    margin-top: 15/@baseS*1rem;
    padding-right: 10/@baseS*1rem;
    display: block;
    margin-left: 20/@baseS*1rem;
    line-height: 1.5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 300;
    font-size:40/@baseS*1rem;
    color: rgb(205,215,225);
  }
  .movieActor{
    padding-right: 20/@baseS*1rem;
    line-height:2;
    display: block;
    margin-left: 20/@baseS*1rem;
    font-style:italic;
    margin:27rpx 0;
    font-size: 24/@baseS*1rem;
    font-weight: 200;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgb(180, 190, 200);
  }
  .movieIntro{
    margin-top: 10/@baseS*1rem;
    margin-left: 20/@baseS*1rem;
    padding-right: 20/@baseS*1rem;
    // text-indent: 20/@baseS*1rem;
    overflow-x: hidden;
    line-height: 1.5;
    // text-overflow: ellipsis;
    display: block;
    font-size: 30/@baseS*1rem;
    font-weight: 100;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: rgb(205,215,225);
  }
</style>

