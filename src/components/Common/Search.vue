<template>
    <div class="searchMain">
        <form class="searchForm" action="" @submit="search($event)">
            <div class="searchBox">
                <div class="searchBoxInner">
                    <input type="search" autocomplete="off" v-model="content" class="inputText" placeholder="输入片名、主演或导演">
                </div>
            </div>
            <a class="searchCancel" v-on:click="cancel()">取消</a>
        </form>
        <div class="mainContent">
            <div v-for="result in resultList">
                <div class="movieItem" @click="play(result)" v-if="result.type == 'movie'">
                    <div class="moviePoster">
                        <img v-lazy="result.data['PicURL_ABS']" lazy="loaded"/>
                        <span class="movieScore">{{result.data.Score}}</span>
                    </div>
                    <div class="movieDetail">
                        <span class="movieName">{{result.data.Name['zh-CN']}}</span>
                        <span class="movieActor">{{result.data.Actor['zh-CN']}}</span>
                        <span class="movieIntro">{{result.data.Introduce['zh-CN']}}</span>
                    </div>
                </div>
                <div class="channelBox" @click="play(result)" v-if="result.type == 'live'">
                    <div class="channelContent">
                        <div class="imgContent" v-lazy:background-image="result.data.ChannelPicURL">
                        </div>
                        <span class="channelName">{{result.data.ChannelName['zh-CN']}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div id="voiceButton" class="voiceButton" :class="{on:recording}" v-on:touchstart="startRecord()" v-on:touchend="stopRecord()">
        </div>
    </div>
</template>

<script type="text/babel">
    import {getResources} from '@/api/service.js'
    import common from '@/common/js/common.js'
import Bus from '@/common/js/bus.js'

    export default {
        name:"Search",
        data() {
            return {
                liveList:[],
                resultList: [],
                content:'',
                recording:false
            }
        },
        mounted() {
            console.log('Search mounted')
            Bus.$on('liveList',list =>{
                this.liveList = list
                console.log(list)
            })
        },
        methods: {
            startRecord(){
                console.log('startRecord');
                wx.startRecord();
                this.recording=true
                // this.$dialog.notify({
                //     mes: '正在聆听...',
                //     timeout: 5000
                // });
            },
            stopRecord(){
                console.log('stopRecord');
                this.recording=false
                let me = this;
                wx.stopRecord({
                    success: function (res) {
                        me.translateVoice(res.localId);
                    }
                });
            },
            translateVoice(localId){
                console.log('translateVoice');
                let me = this;
                wx.translateVoice({
                    localId: localId, // 需要识别的音频的本地Id，由录音相关接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: res => {
                        console.log(res);
                        let translateText = res.translateResult ? res.translateResult.replace('。','') : '';
                        console.log(translateText);
                        if(!translateText)
                            this.$dialog.toast({mes: "对不起我没听清", timeout: 2000});
                        me.content = translateText;
                        me.search();
                    }
                })
            },
            cancel(){
                let data = {
                    'content': 'CancelButton'
                }
                common.sendRemoteControlEvent(data,'clickButton')
                window.history.go(-1)
            },
            search(event){
                if(event){
                    event.preventDefault()
                }
                console.log("search")
                this.$dialog.loading.open('正在搜索...');
                let params = {
                    'action': 'search',
                    'projectID': localStorage.getItem('projectName'),
                    'content':this.content
                }
                var me = this
                getResources(params).then(res => {
                    this.$dialog.loading.close();
                    let datas = res.data
                    console.log("search live")
                    console.log(me.liveList)                    
                    for(let j = 0; j < me.liveList.length; j++) {
                        console.log(me.liveList[j].ChannelName['zh-CN'])
                        let channel = me.liveList[j].ChannelName['zh-CN']+me.liveList[j].ChannelName['en-US']
                        if(channel.toLowerCase().indexOf(me.content.toLowerCase()) !== -1){
                            let result = {"type":"live"}
                            result["data"] = me.liveList[j];
                            result["data"]["index"] = j;
                            datas.push(result);
                        }
                    }
                    console.log(datas)
                    if(datas.length < 1){ 
                        this.$dialog.toast({mes: 'Sorry,未找到相关内容！', timeout: 2000});
                    }else{
                        me.resultList = datas;
                    }
                })
            },
            play(result) {
                common.playAudio();
                if(result.type=='movie'){
                    let data = {
                    'movieID': result.data.ID
                    }
                    common.sendRemoteControlEvent(data,'playMovie')
                }else if(result.type == 'live'){
                    let data = {'channelIndex':result.data.index}
                    common.sendRemoteControlEvent(data,"playLive")
                }
            }
        },
        watch: {
            
        }
    }
</script>

<style lang="less" scoped>
@baseS: 75;
.voiceButton{
    user-select: none;
    position: fixed;
    bottom: 6%;
    height: 120/@baseS*1rem;
    width: 120/@baseS*1rem;
    right: 50%;
    margin-right: -60/@baseS*1rem;
    text-align: center;
    background-image: url('../../assets/images/voice.png');
    // background-color: #fff;
    background-size: 120/@baseS*1rem 120/@baseS*1rem;
}
.voiceButton.on{
    background-image: url('../../assets/images/voice_pressed.png');
}
.searchMain{
    position: absolute;
    height: 100%;
    width: 100%;
    color: #ffffff;
}
.searchForm {
    position: fixed;
    left: 0;
    right: 0;
    background-color: rgb(30,30,30);
    z-index: 10;
}
.searchCancel {
    position: absolute;
    top: 40/@baseS*1rem;
    right: 40/@baseS*1rem;
    line-height: 80/@baseS*1rem;
    font-size: 36/@baseS*1rem;
    color: #ccc
}
.inputText {
    width: 100%;
    height: 80/@baseS*1rem;
    line-height: 40/@baseS*1rem;
    padding: 10/@baseS*1rem 0 10/@baseS*1rem;
    border: none;
    font-size: 30/@baseS*1rem;
    background-color: transparent;
}
.searchBoxInner {
    padding: 0 20/@baseS*1rem 0 20/@baseS*1rem;
    background-color: #fff;
    border-radius: 40/@baseS*1rem;
    box-sizing: border-box;
}
.searchBox {
    position: relative;
    padding: 1px;
    margin: 40/@baseS*1rem;
    margin-right: 140/@baseS*1rem;
    line-height: 40/@baseS*1rem;
    font-size: 30/@baseS*1rem;
    border-radius: 40/@baseS*1rem;
    background: #03B0FF;
    background: -webkit-gradient(linear,left top,right top,color-stop(0%,#5DCF0C),color-stop(30%,#2DBE8F),color-stop(100%,#03B0FF));
    background-image: -webkit-linear-gradient(left,#5DCF0C 0,#2DBE8F 30%,#03B0FF 100%);
    background-image: linear-gradient(to right,#5DCF0C 0,#2DBE8F 30%,#03B0FF 100%);
    background-clip: padding-box;
}
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
    margin-top: 160/@baseS*1rem;
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
  .channelBox{
    border-radius:9px;
    margin:30/@baseS*1rem;
    height: 140/@baseS*1rem;
    color:rgb(245,245,245);
    background-color: rgba(255,255,255,.05)
  }
  .channelName{
    display: inline-block;
    position: absolute;
    top: 0;
    left:150/@baseS*1rem;
    font-size: 18px;
    line-height:140/@baseS*1rem;
  }
  .channelContent{
    height: 100%;
    position: relative;
  }
  .imgContent{
    height: 80/@baseS*1rem;
    width: 80/@baseS*1rem;
    left:15px;
    position: absolute;
    top:15px;
    background: center center no-repeat;
    background-size: contain;
  }
</style>