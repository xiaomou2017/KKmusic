<template>
    <div class="Albumlist">
        <div class="heig"></div>
        <div class="back" >
            <img v-on:click="back" src="../assets/fan.jpg" alt="">
          </div>
        <div class="all">
            <div class="bg"></div>
            <div class="top">
                <div class="r">
                    <i>{{imgname}}</i>
                    <i></i>
                </div>
                <div class="l">
                    <img :src=imgurl alt="">
                </div>
                <p>歌曲列表</p>
            </div>

            <div class="btn">
                <ul>
                    <ListItem v-for="item in newMusicList" @playMusic="$emit('playMusic',item.id)" :item="item" :key="item.id"></ListItem>
                </ul>
                <div class="hei"></div>
            </div>
        </div>
    </div>
</template>

<script>
import ListItem from '../components/ListItem';
export default {
    data(){
        return{
            newlist:[],
            imgurl:[],
            imgname:[],

            newMusicList:[],
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        playMusic(id){
            this.$emit('playMusic',id);
        }
    },
    components:{
        ListItem
    },
    beforeRouteEnter(to,from,next){//$route
    next(vm=>{
        let aid = vm.$route.params.id
        vm.$http.get('/album?id='+aid).then(data=>{
          vm.newlist = data.data.songs
          vm.imgurl = data.data.album.blurPicUrl
          vm.imgname = data.data.album.name
          
      }).then(()=>{
        for(let key of vm.newlist){
            vm.$http.get('/song/detail?ids='+key.id).then(data=>{
            // console.log(data)
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
            })
        }
    })
    });
  },
}
</script>

<style lang="less" scoped>
.Albumlist{
    .heig{
        width: 100%;
        height: 30px;
    }
    .back{
        text-align: left;
          height: 30px;
          position: fixed;
          top: 0;
        img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }
    }
    .top{
        width: 100%;
        height: 60vh;
        p{
            text-align: left;
            margin-top: 10px;
            margin-left: 10px;
            font-size: 30px;
        }
        div{
            &:nth-child(2){
                margin-top: 10px;
                img{
                    width: 80%;
                    height: 80%;
                }
            }
            &:nth-child(1){
                i{
                    &:nth-child(1){
                        margin-top: 20px;
                        font-size: 20px;
                    }
                }
            }
        }
    }
    .btn{
        ul{
            li{
                margin-left: 10px;
            }
        }
        .hei{
            height: 20vh;
        }
    }
}
</style>