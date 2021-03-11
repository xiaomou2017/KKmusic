<template>
  <div class="recommend">
    <div class="height"></div>
      <Title>推荐歌单</Title>
      <ul class="recommendList">
        <router-link v-for="rem in recommendMusicList" :key="rem.id" :to="{path:'/musiclist/'+rem.id}" tag="li">
        <!-- {{rem}} -->
          <div>
            <img :src="rem.picUrl"/>
            <span>{{rem.playCount|formatNum}}</span>
          </div>
          <p>{{rem.name|substr(26)}}</p>
        </router-link>
      </ul>
      <Loading v-if="recommendMusicList.length<=0"/>
      <Title>最新音乐</Title>
      <MusicItem :newMusicList="newMusicList" @playMusic="playMusic"></MusicItem> 
      
  </div>
</template>

<script>
import Title from '../components/Title'
import MusicItem from '../components/MusicItem'
import Loading from '../components/Loading'
export default {
  name: 'Recommend',
  components: {
    Title,
    MusicItem,
    Loading
  },
  data(){
    return {
      recommendMusicList:[],
      newMusicList:[],
    }
  },
  methods:{
      playMusic(id){
        console.log(id)
          this.$emit('playMusic',id);
      }
  },
  beforeRouteEnter(to,from,next){//$route
    next(vm=>{
      vm.$http.get('/personalized?limit=6').then(data=>{//获取推荐歌单
          vm.recommendMusicList=data.data.result;
          console.log(data)
      }).catch(()=>{
        
      });
      vm.$http.get('/personalized/newsong').then(data=>{//获取最新音乐列表
          vm.newMusicList=data.data.result;
      }).catch(()=>{

      });
    });
  },
  filters:{//拦截器
    formatNum(value){
        return (value/10000).toFixed(1)+"万";
    },
    substr(value,len){
      return value.substr(0,len)+'...';
    }
  }
}
</script>
<style lang="less" >
*{
  padding:0;
  margin:0;
}
ul{
  list-style:none;
}
img{
  width: 100%;
  height: 100%;
}
.height{
  height: 45px;
}
.recommend{
  // width: 100%;
  // height: 100%;
    // background: url(../assets/recommand_bg_2x.png)no-repeat;
}
ul.recommendList{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: white;
  li{
    width:33%;
    margin-top:20px;
    div{
      position: relative;
      span{
        top:2px;
        right:3px;
        position: absolute;
        color:white;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
      }
    }
    p{
      font-size:12px;
      text-align: left;
      word-wrap:none;
      padding:0px 8px;
    }
  }
  
} 
</style>
