<template>
  <div class="player">
      <audio ref="musicplayer" 
              autoplay 
              :src="`https://music.163.com/song/media/outer/url?id=${musicID}.mp3`"
              @timeupdate="timeupdate"
      />
      <div class="playerBar">
          <div class="up" @click="isFullLrc=!isFullLrc;add()"><img src="../assets/xianxingtubiaozhizuomoban-14.svg" alt=""></div>
          <i ref="rollImg">
            <img :src="song.al.picUrl"/>
          </i>
          <i>
            <div class="name">{{song.name}}-{{song.ar[0].name}}</div>
            <div class="BtnMusic">
              <ul>
                <li><img src="../assets/bt.jpg" alt=""></li>
                <li @click="togglePlay()"><img :src="imgSrc" alt=""></li>
                <li><img src="../assets/up.png" alt=""></li>
                <li><img src="../assets/gen.jpg" alt=""></li>
            </ul>  
            </div>
          </i>
          <i @click="togglePlay">
            <canvas ref="canvas" style="display:none" width="50" height="50"></canvas>
          </i>
      </div>
      <div class="fullLrc" v-show="isFullLrc">
          <div class="lrc">
            <div class="img" :style='{backgroundImage:"url("+song.al.picUrl+")",backgroundRepeat:"no-repeat"}'>
              <div>
                <ul :style="{
                  transform:`translateY(-${lrcCurrent*25}px)`
                }">
                  <li v-for="(lrc,i) in lrcArr" :key="i" :class="{active:i==lrcCurrent}">{{lrc.lyric}}</li>
                </ul>
             </div> 
          </div>
          </div>
      </div>
  </div>
</template>
<script>
import kai from '../assets/kai.png';
import stop from '../assets/stop.png';
export default {
  props:['musicID'],
  
  data(){
    return {
        song:{
          al:{
            picUrl:''
          },
          name:null,
          ar:[
            {name:''}
          ]
        },
        lrcArr:[],
        isFullLrc:false,
        lrcCurrent:0,
        imgSrc:stop,
        img:[],
      }
    },
  watch:{
    musicID(val){
      
        this.$http.get('/song/detail?ids='+val).then(data=>{//根据id获取歌曲详细信息.
          this.song=data.data.songs[0];
        });
        this.$http.defaults.baseURL="http://music.kele8.cn";//临时改变请求baseURL
        this.$http.get('/lyric?id='+val).then((lrcdata)=>{//请求歌词信息
            let lrc=lrcdata.data.lrc.lyric;
            let lrcArr=lrc.split(/\n/);
            let reg=/\[(\d+):(\d+\.\d+)\](.+)/;
            this.lrcArr=lrcArr.map(lc=>{
                reg.test(lc);
                return {
                  time:parseInt(RegExp.$1*60)+parseFloat(RegExp.$2),
                  lyric:RegExp.$3
                }
            });
        });
        this.$http.defaults.baseURL='http://musicapi.leanapp.cn/';//把临时服务器请求改回 leanapp.cn
        return val;
    },
    
  },
  components:{
  },
  methods:{
    togglePlay(){
        if(this.$root.playingMusic.isPlay){//如果为true 改为暂停
          this.$root.playingMusic.isPlay=false;
          this.$refs.musicplayer.pause();
          this.$refs.rollImg.style.animationPlayState="paused"; //running
          // console.dir(this.$refs.rollImg.style);
          this.imgSrc=kai

        }else{//暂停改为播放
          this.$root.playingMusic.isPlay=true;
          this.$refs.musicplayer.play();
          this.$refs.rollImg.style.animationPlayState="running";//设置ainimation动画运行状态.
        this.imgSrc=stop

        }
    },
    showFull(){
      this.isFullLrc=true;
    },
    timeupdate(event){
      let audio=event.target;
      let currentTime=audio.currentTime;//当前播放的时间
      let durationTime=audio.duration;//总时长
      for(var i in this.lrcArr){
        let lrcTime=this.lrcArr[i].time;//歌词的时间
        var i2=parseInt(i)+1;//下标 是字符串 "0" +1 "1" +1
        if(currentTime>=lrcTime && currentTime<this.lrcArr[i2].time){
          this.lrcCurrent=i;//  0 1 2 3 4 5 6 
          break;
        }
      }
      // console.log(this.lrcCurrent);
      //  audio.currentTime 当前播放时间  audio.duration 音频总时长
      this.drawCircle(currentTime,durationTime);
    },
    drawCircle(c,d){
      let canvas=this.$refs.canvas;
      let cxt=canvas.getContext('2d');//上下文
      cxt.beginPath();
      cxt.strokeStyle="red";
      cxt.arc(25,25,20,0,Math.PI*2);
      cxt.stroke();
      cxt.closePath();

      cxt.beginPath();
      cxt.strokeStyle="blue";
      cxt.arc(25,25,20,0,(Math.PI*2*(c/d)));  
      cxt.stroke(); 
      cxt.closePath();
    }
  }
}
</script>
<style lang="less" scoped>
  .player{
    position: fixed;
    bottom:0px;
    width:100%;
    background-color: #fff;
    .name{
      margin-left: -80px;
    }
    audio{
      height:20px;
    }
    .playerBar{
      display: flex;
      position: relative;
      i{
        display: inline-block;
        &:first-of-type{
          width:70px;
          height:70px;
          border-radius: 50%;
          overflow: hidden;
          animation: rollImg 2s linear 0s infinite;
        }
        &:nth-of-type(2){
          flex:1
        }
        &:last-of-type{
          // width:60px;
          // height:60px;
          padding-top: 10px;
          position: relative;
          img{
            position: absolute;
            top: 70%;
            right: 10%;
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
         .BtnMusic{
              ul{
                  display: flex;
                  li img{
                      width: 50px;
                      height: 50px;
                      border-radius: 50%;
                  }
                  li:nth-child(1){
                      flex: 1;
                      margin-top: 10px;
                      img{
                        width: 40px;
                        height: 40px;
                      }
                  }
                  li:nth-child(2){
                      flex: 1;
                      
                  }
                  li:nth-child(3){
                      flex: 1;
                      margin-top: 10px;
                      img{
                        width: 40px;
                        height: 40px;
                      }
                  }
                  li:nth-child(4){
                      flex: 1;
                      margin-top: 10px;
                      img{
                        width: 40px;
                        height: 40px;
                      }
                  }
              }
          }
      }
      .up{
        width: 120px;
        height: 20px;
        background-color: skyblue;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        position: absolute;
        top: -20px;
        left: 35%;
        img{
          width: 120px;
          height: 20px;
        }
      }
    }
    .fullLrc{
      width:100vw;
      height:80vh;
      
      .quan{
        width: 100%;
        height: 21vh;
      }
      h1{
        font-size: 20px;
      }
      .lrc{
        .img{
          width: 100%;
          background-size: 100% 100%;
        }
        div{
          width: 100%;
          height: 80vh;
          overflow: hidden;
          ul{
            position: relative;
            top: 40vh;
            li{
              text-align: center;
              height:25px;
              &.active{
                color:red;
                font-size: 25px;
              }
            }
          }
        }
      }
    }
  }
@keyframes rollImg{
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}

@keyframes run {
  from{
    height: 0%;
  }
  to{
    height: 100%;
  }
}
</style>
