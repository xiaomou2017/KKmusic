<template>
  <div>
    <div class="height"></div>
     <div class="hottitle">
       <div class="bg"></div>
       <p>更新日期:{{updateDate|formatDate}}</p>
     </div>
     <div  class="bg">
     <ul>
        <ListItem v-for="(item,k) in hotMusicList" :num="k+1" :item="item" :key="item.id">
          <div class="right">{{k+1}}</div>  
        </ListItem>
     </ul>
     </div>
     <!-- <button @click="abc()">查看更多...</button> -->
     <Loading/>
     <router-link :to="`/hot/${num+1}`">查看更多....</router-link>
  </div>
</template>
<script>
import ListItem from '../components/ListItem'
import Loading from '../components/Loading';
export default {
  name:"Hot",
  data(){
    return {
      updateDate:new Date(),
      hotMusicList:[],
      num:0
    }
  },
  methods:{
    abc(){
      this.loadMusic(this)
    },
    loadMusic(vm){
        let musicids=[];
        vm.num++;
        vm.$http.get('/top/list?idx=1').then(data=>{//获取热榜信息
          vm.updateDate=data.data.playlist.updateTime;//获取更新日期
          musicids=data.data.playlist.trackIds.slice(20*(vm.num-1),20*vm.num);
        }).then(()=>{
            for(let v of musicids){
              vm.$http.get('song/detail?ids='+v.id).then((data)=>{//根据热榜里面歌曲id获取歌曲详细信息
                vm.hotMusicList.push({
                  name:data.data.songs[0].name,
                  id:data.data.songs[0].id,
                  song:{
                    privilege:{
                      maxbr:data.data.privileges[0].maxbr
                    },
                    artists:data.data.songs[0].ar
                  }
                });
                //console.log(data);
              });
            }
        });
    }
  },
  components:{
    ListItem,
    Loading
  },
  created(){
  },
  beforeRouteEnter(to,from,next){//路由进入之前会执行一次
    next(vm=>{
      if(typeof vm.$route.params.num == 'undefined'){//判断有没有路由进来 如果有路由.不清空原来数据.
        vm.hotMusicList=[];
        vm.num=0;
      }
      vm.loadMusic(vm);
    });
  },
  beforeRouteUpdate(to,from,next){
      this.loadMusic(this);
      next();
  },
  filters:{
    formatDate(value){
      let d=new Date(value);
      let month=(d.getMonth()+1);
      return (month<10?"0"+month:month)+"月"+d.getDate()+"日";
    }
  }
}
</script>
<style lang="less" scoped>
.height{
  height: 40px;
}
.bg{
  // background: url(../assets/recommand_bg_2x.png)no-repeat;
  // background-size: 60vh;
}
.hottitle{
  height: 200px;
  background:url(../assets/hot_music_bg_2x.jpg) no-repeat center;
  background-size:cover;
  position: relative;
  div{
    height: 80%;
    background: url(../assets/index_icon_2x.png)no-repeat -47px -49px;

  }
  p{
    position: absolute;
    bottom: 10%;
    margin-top: 50px;
    margin-left: 10px;
    text-align: left;
    color: white;
  }
}
a{
  text-decoration: none;
  color: black;
}
</style>