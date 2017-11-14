<template>
  <div class="MovieList">
    <div class="header" id='movietag'>
      <div class="movieTag">
        <div :class="{'subCate': true, 'selected': selectTag == category.ID}" v-for="category in categoryList" :key="category.id" @click="getMovieListByTag(category.ID)">{{category.CategoryName['zh-CN']}}</div>
      </div>
    </div>
    <div class="mainContent">
      <div class="movieItem" v-for="movie in movieList">
        <img v-lazy="movie['PicURL_ABS']" lazy="loaded" class="moviePoster" @click="showMovieDetail(movie)"></img>
        <span class="movieName">{{movie.Name['zh-CN']}}</span>
      </div>
      <div class="contentBottom">已经到底啦</div>
    </div>
    
    <TabBar v-show="hasLive"></TabBar>
    <ControlTip></ControlTip>
  </div>
</template>

<<script>

import common from '@/common/js/common.js'
import {getResources} from '@/api/service.js'
import TabBar from '@/components/Common/TabBar.vue'
import ControlTip from '@/components/Common/ControlTip.vue'
import {configs} from '@/data/staticData.js'

export default {
  name: 'MovieList',
  components: {
    TabBar,
    ControlTip
  },
  data() {
      return{
        selectTag: 0,
        movieList: [],
        categoryList: [],
        movieInfo:{},
        hasLive:configs.hasLive
      }
  },
  activated() {
    common.setDocumentTitle('看大片')
    document.querySelector('body').scrollTop = localStorage.getItem('moviePostion');
    document.getElementById('movietag').scrollLeft = localStorage.getItem('tagPostion');
    document.getElementById('controltip').style.left = "0px";
    document.getElementById('controltip').style.top = "0px";
  },
  deactivated() {
    localStorage.setItem('moviePostion',document.querySelector('body').scrollTop);
  },
  mounted() {
    console.log("mounted")
    this.initData();
  },
  methods: {
    async initData(){
      console.log("initData")
      this.getMovieTag()
      this.checkMovieInfo()
      if(localStorage.getItem('selectTag')){
        this.getMovieListByTag(parseInt(localStorage.getItem('selectTag')))
      }else{
        this.getMovieListByTag(0)
      }
    },
    async checkMovieInfo(){
      common.showLoading(true)
      let params = {
        'action': 'checkVersion',
        'projectID': localStorage.getItem('projectid')
      }
      getResources(params).then(res => {
        console.log("checkMovieInfo")
        console.log(res)
        this.movieInfo = res.data;
      })
    },
    async getMovieTag(){
      common.showLoading(true)
      let params = {
        'action': 'getMovieTag',
        'projectID': localStorage.getItem('projectid')
      }
      getResources(params).then(res => {
        this.categoryList = res.data;
      })
    },
    async getMovieListByTag(ID){
      common.showLoading(true)
      this.selectTag = ID;
      localStorage.setItem('tagPostion',document.getElementById('movietag').scrollLeft);
      localStorage.setItem('selectTag',ID);
      let params = {
        'action': 'getMovieListByTag',
        'projectID': localStorage.getItem('projectid'),
        'data': {
          'tagid': ID
        }
      };
      getResources(params).then(res => {
        common.showLoading(false)
        this.movieList = res.data;
      })
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
  .header{
    position: fixed;
    z-index: 10;
    width: 100%;
    background: rgb(21,25,15);
    overflow: auto;
    font-size: 16px;
    height: 90/@baseS*1rem;
    -webkit-overflow-scrolling: touch;
  }
  .movieTag{
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
  }
  .subCate{
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 165/@baseS*1rem;
    height: 100%;
    position: relative;
    color:rgb(80,80,80);
  }
  .selected{
    color: rgb(18,150,219) !important;
    font-weight: bold;
  }
  .mainContent{
    -webkit-overflow-scrolling: touch;
    width: 100%;
    overflow: auto;
    position: absolute;
    padding-top:  90/@baseS*1rem;
  }
  .movieItem{
    display: inline-block;
    width: 31%;
    height: 360/@baseS*1rem;
    padding-left: 5/@baseS*1rem;
    background-size: cover;
    position: relative;
    margin: 5/@baseS*1rem;
    vertical-align: middle;
    overflow: hidden;
    border-radius: 10px;
  }
  .moviePoster{
    height:100%;
    border-radius: 10/@baseS*1rem;
    opacity: 0;
    -webkit-transition: opacity 0.25s ease-in-out;
    -moz-transition: opacity 0.25s ease-in-out;
    -o-transition: opacity 0.25s ease-in-out;
    transition: opacity 0.25s ease-in-out;
  }
  img[lazy=loaded]{
    opacity: 1;
  }
  .movieName{
    line-height:50/@baseS*1rem;
    width: 100%;
    bottom: 0;
    padding-top: 50/@baseS*1rem;
    position: absolute;
    white-space: nowrap;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    color: white;
    background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%);
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%);
  }
</style>

