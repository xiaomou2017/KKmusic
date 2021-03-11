<template>
  <div class="MusicList">
      <div class="top">
        <div>
          <div class="back" >
            <img v-on:click="back" src="../assets/fan.jpg" alt="">
          </div>
          <img class="b" :src="MusicList.coverImgUrl" alt="">
        </div>
        <div class="top-bt">
          <i>{{MusicList.name}}</i>
          <i><img :src="Music.avatarUrl" alt=""><span>{{Music.nickname}}</span></i>
        </div>
      </div>
      <div class="btn">
        <div class="btn-ge">歌曲列表</div>
        <ul>
          <ListItem v-for="item in newMusicList" @playMusic="$emit('playMusic',item.id)" :item="item" :key="item.id"></ListItem>
        </ul>
        <div class="hei"></div>
      </div>
  </div>
</template>

<script>
import ListItem from '../components/ListItem';
export default {
  data(){
    return {
      MusicList:[],
      mList:[],
      Music:[],

      newMusicList:[],
    }
  },
  components:{
    // MusicItem,
    // Loading,
    ListItem
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    playMusic(id){
        this.$emit('playMusic',id);
    }
  },
  
  beforeRouteEnter(to,from,next){//$route
    next(vm=>{
      let aid = vm.$route.params.musicid
        vm.$http.get('/playlist/detail?id='+aid).then(data=>{
        vm.MusicList=data.data.playlist;
        vm.Music = data.data.playlist.creator
        vm.mList = data.data.playlist.trackIds.slice(0,20)
        console.log(vm.mList)
      }).then(()=>{

       for(let key of vm.mList){
          // console.log(key.id)
          vm.$http.get('/song/detail?ids='+key.id).then(data=>{//获取最新音乐列表
          vm.newMusicList.push({
            name:data.data.songs[0].name,
            id:data.data.songs[0].id,
            song:{
              privilege:{
                maxbr:data.data.privileges[0].maxbr
              },
              artists:data.data.songs[0].ar
            }
          })
          console.log(vm.newMusicList)
          })
        }
      })
    });
  },
}
</script>

<style lang="less" scoped>
.hei{
  height: 100px;
}
  .MusicList{
    width: 100%;
    height: 100%;
    .top{
      display: flex;
        width: 100%;
        height: auto;
        background-color: grey;
        // background: rgba(0,0,0,.2);
        
        .b{
          flex: 1;
          width: 20vh;
          height: 20vh;
          margin-left: 20px;
          margin-bottom: 20px;
          margin-top: 10px;
        }
        .back{
          text-align: left;
          height: 30px;
          img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }
        .top-bt{
          flex: 1;
          text-align: left;
          margin-left: 10px;
          margin-top: 40px;
          i:nth-child(2){
            display: flex;
            img{
              width: 30px;
              height: 30px;
              margin-top: 30px;
              float: left;
              border-radius:50%;
            }
            span{
              margin-left: 10px;
              margin-top: 35px;
              float: left;
            }
          }
        }
    }
    .btn{
      .btn-ge{
        text-align: left;
        width: 100%;
        height: 25px;
        line-height: 25px;
        background-color: #eeeff0;
        padding-left: 10px;
        
      }
      ul{
          width: 100%;
          justify-self: 100%;
          li{
            border-top: 15px;
          }
        }
    }

  }

</style>