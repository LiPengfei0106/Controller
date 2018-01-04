<template>
<div>
    <div class="TitleBar">
        <div class="titleTag" v-show="titleBarType=='showMovie'">
            <div class="TVButton"  v-show="hasLive">
                <img src="../../assets/images/tv_pressed.png" @click="showLive()">
            </div>
            <div class="movieTagList">
              <div :class="{'subCate': true, 'selected': selectTag == category.ID}" v-for="category in categoryList" :key="category.id" @click="getMovieListByTag(category.ID)">
                  {{category.CategoryName['zh-CN']}}
              </div>
            </div>
        </div>
        <div class="titleTag" v-show="titleBarType=='showLive'">
            <div class="TVButton" v-show="hasMovie">
                <img src="../../assets/images/movie_pressed.png" @click="showMovie()">
            </div>
            <div class="liveTitle">
                电视直播
            </div>
        </div>
        <div class="searchBar" v-on:click="search()">
          <div>搜索</div>
        </div>
    </div>
    <!-- <transition name="fade">
      <div v-if="show" class="searchPage">
        <form class="searchForm" @submit="search($event)">
        <div>
          <div class="searchBox">
            <div class="searchBoxInner">
              <input type="search" v-model="content" class="inputText" name="keyWord" id="keyword" placeholder="输入片名、主演或导演">
            </div>
          </div>
          <a class="searchCancel" v-on:click="show = !show;stopBodyScroll(false)">取消</a>
        </div>
        </form>
        <SearchResult></SearchResult>
      </div>
    </transition> -->
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
        show: false,
        selectTag: 0,
        categoryList: [],
        hasLive:configs.hasLive,
        hasMovie:configs.hasMovie,
        titleBarType:'',
        content:''
      }
  },
  created() {
      // if(this.hasMovie){
      //   this.titleBarType = 'showMovie'
      //   this.getMovieTag()
      // }else{
      //   this.titleBarType = 'showLive'
      // }
  },
  mounted() {
    if(this.hasMovie){
        this.titleBarType = 'showMovie'
        this.getMovieTag()
      }else{
        this.titleBarType = 'showLive'
      }
  },
  methods: {
    search(){
      console.log('clicked');
      let data = {
        'content': 'Search'
      }
      common.sendRemoteControlEvent(data,'clickButton')
      this.$router.push({name:'Search'})
    },
    stopBodyScroll (isFixed) {
      let bodyEl = document.body
      if (isFixed) {
        bodyEl.style.position = 'fixed'
      } else {
        bodyEl.style.position = ''
      }
    },  
    showMovie(){
        this.titleBarType = 'showMovie'
        Bus.$emit('mainContent','showMovie');
        let data = {
          'content': 'showMovie'
        }
        common.sendRemoteControlEvent(data,'clickButton')
    },
    showLive(){
        this.titleBarType = 'showLive'
        Bus.$emit('mainContent','showLive');
        let data = {
          'content': 'showLive'
        }
        common.sendRemoteControlEvent(data,'clickButton')
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
      let data = {
        'tagID': ID
      }
      common.sendRemoteControlEvent(data,'clickTag')
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
.searchBar{
  position: fixed;
  z-index: 10;
  height: 88/@baseS*1rem;
  width: 100%;
  background: rgb(21,25,15)
}
.searchBar div{
  text-align:center;
  font-size: 30/@baseS*1rem;
  color: #666;
  border:1px solid #333;
  height: 40/@baseS*1rem;
  padding:8/@baseS*1rem;
  margin:12/@baseS*1rem 24/@baseS*1rem;
  background: rgb(30,30,30);
  width:90%;
  border-radius:40/@baseS*1rem;
  -moz-border-radius:40/@baseS*1rem; /* 老的 Firefox */
}
.TVButton{
    display: inline-block;
    width: 150/@baseS*1rem;
    height: 100/@baseS*1rem;
    background-color: rgb(20,20,20);
    z-index: 11;
  }
.TVButton img{
  align-self: center;
    padding-left: 50/@baseS*1rem;
    width: 50/@baseS*1rem;
    margin: 12/@baseS*1rem;
}
.TitleBar{
    position: fixed;
    z-index: 10;
    width: 100%;
    background-color: rgb(20,20,20);
    overflow: auto;
    font-size: 16px;
    height: 188/@baseS*1rem;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
  }
.movieTagList{
  position: relative;
  width: 100%;
  height: 100/@baseS*1rem;
  z-index: 10;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
  margin-left: 30/@baseS*1rem;
}
  .titleTag{
    position: relative;
    width: 100%;
    height: 100/@baseS*1rem;
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
    width: 12%;
    height: 40/@baseS*1rem;
    position: relative;
    color:rgb(80,80,80);
    font-size: 36/@baseS*1rem;
    font-weight: 100;
    margin: 30/@baseS*1rem 22/@baseS*1rem;
  }
  .selected{
    color: rgb(18,150,219) !important;
    font-weight: 500;
  }
  .liveTitle{
    position: absolute;
    top: 0;
    left:60px;
    right: 60px;
    bottom: 0;
    color: #ddd;
    font-size: 42/@baseS*1rem;
    text-align: center;
    height: 80/@baseS*1rem;
    line-height: 90/@baseS*1rem;
  }

</style>

