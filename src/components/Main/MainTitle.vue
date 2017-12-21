<template>
    <div class="TitleBar">
        <div class="movieTag" v-show="titleBarType=='showMovie'">
            <div class="TVButton"  v-show="hasLive">
                <img src="../../assets/images/tv_pressed.png" @click="showLive()">
            </div>
            <div :class="{'subCate': true, 'selected': selectTag == category.ID}" v-for="category in categoryList" :key="category.id" @click="getMovieListByTag(category.ID)">
                {{category.CategoryName['zh-CN']}}
            </div>
        </div>
        <div class="liveTag" v-show="titleBarType=='showLive'">
            <div class="TVButton" v-show="hasMovie">
                <img src="../../assets/images/movie_pressed.png" @click="showMovie()">
            </div>
            <div class="liveTitle">
                电视直播
            </div>
            
        </div>
    </div>
</template>

<script>
import common from '@/common/js/common.js'
import Bus from '@/common/js/bus.js'
import {getResources} from '@/api/service.js'
import {configs} from '@/data/staticData.js'

export default {
  name: 'MainTitle',
  data() {
      return{
        selectTag: 0,
        categoryList: [],
        hasLive:configs.hasLive,
        hasMovie:configs.hasMovie,
        titleBarType:''
      }
  },
  created() {
      if(this.hasMovie){
        this.titleBarType = 'showMovie'
        this.getMovieTag()
      }else{
        this.titleBarType = 'showLive'
      }
  },
//   mounted() {
//     this.initData();
//   },
  methods: {
    showMovie(){
        this.titleBarType = 'showMovie'
        Bus.$emit('mainContent','showMovie');
    },
    showLive(){
        this.titleBarType = 'showLive'
        Bus.$emit('mainContent','showLive');
    },
    initData(){
      if(this.hasMovie){
        this.titleBarType = 'showMovie'
        this.getMovieTag()
      }else{
        this.titleBarType = 'showLive'
      }
    },
    async getMovieTag(){
      common.showLoading(true)
      let params = {
        'action': 'getMovieTag',
        'projectID': localStorage.getItem('projectName')
      }
      getResources(params).then(res => {
        this.categoryList = res.data;
        this.getMovieListByTag(this.categoryList[0]['ID'])
      })
    },
    async getMovieListByTag(ID){
      common.showLoading(true)
      Bus.$emit('mainContent','showMovie');
      this.selectTag = ID;
      let params = {
        'action': 'getMovieListByTag',
        'projectID': localStorage.getItem('projectName'),
        'data': {
          'tagid': ID
        }
      };
      getResources(params).then(res => {
        common.showLoading(false)
        Bus.$emit('movieList', res.data);
      })
    }
  }
}
</script>

<style lang="less" scoped>
@baseS: 75;
.TVButton{
    display: inline-block;
    margin-left: 10/@baseS*1rem;
  }
.TVButton img{
    width: 50/@baseS*1rem;
    margin: 5/@baseS*1rem;
}
.TitleBar{
    position: fixed;
    z-index: 10;
    width: 100%;
    background-color: rgb(20,20,20);
    overflow: auto;
    font-size: 16px;
    height: 90/@baseS*1rem;
    overflow-y: hidden;
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
    width: 16%;
    height: 100%;
    position: relative;
    color:rgb(80,80,80);
    padding-left: 60/@baseS*1rem;
  }
  .selected{
    color: rgb(18,150,219) !important;
    font-weight: bold;
  }
  .liveTitle{
    position: absolute;
    top: 0;
    left:60px;
    right: 60px;
    bottom: 0;
    color: #ffffff;
    font-size: 20px;
    text-align: center;
    height: 90/@baseS*1rem;
    line-height: 90/@baseS*1rem;
  }

</style>

