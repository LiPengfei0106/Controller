<template>
   <div class="TabBar">
     <div class="routerBox">
      <router-link to="/MovieList" class="link-to" >
        <img src="../../assets/images/movie.png" v-show="!isMovie">
        <img src="../../assets/images/movie_pressed.png" v-show="isMovie">
      </router-link>
     </div>
     <div class="routerBox">
      <router-link to="/LiveList" class="link-to" >
        <img src="../../assets/images/tv.png" v-show="!isLive" >
        <img src="../../assets/images/tv_pressed.png" v-show="isLive">
      </router-link>
     </div>
   </div>
</template>
<script>
export default {
 name: 'TabBar',
 data: function() {
   return {
     isMovie: window.location.hash == '#/MovieList',
     isLive: window.location.hash == '#/LiveList'
   }
 },
 methods: {
   
 }
}
</script>
<style lang="less">
  @baseS: 75;

  .TabBar{
    position: fixed;
    bottom: 0;
    padding-top: 7px;
    width: 100%;
    text-align: center;
    background-color: rgb(21,25,15);
    // height: 120/@baseS*1rem;
  }
  .link-to{
    text-align: center;
    text-decoration: none;
    display: inline-block;
    width: 40%;
    z-index: 10;
    position: relative;
  }
  .routerBox{
    display: inline-block;
    width: 40%;
  }
  .link-to img{
    width: 60/@baseS*1rem;
  }

</style>
