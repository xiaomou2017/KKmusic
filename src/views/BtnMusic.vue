<template>
    <div class="BtnMusic">
        <div class="height"></div>
        <div class="back">
            <img @click="black()" src="../assets/fan.jpg" alt="">
            <span>{{name}}</span>
            </div>
        <router-link :to="{path:'/Albumlist/'+i.id}" class="top" v-for="(i,k) in MusicList" :key="k">
            <div><img :src="i.picUrl" alt=""></div>
            <div>{{i.name}}</div>
        </router-link>  
        <div class="hei"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            MusicList:[],
            name:"",
        }
    },
    methods:{
        black(){
            // console.log(123)
            this.$router.go(-1)
        }
    },
    beforeRouteEnter (to, from, next){
        next(vm=>{
                let aid = vm.$route.params
                vm.$http.get('/artist/album?id='+aid.id+'&limit=30').then(data=>{//获取最新音乐列表
                vm.name = data.data.artist.name
                vm.MusicList = data.data.hotAlbums
                console.log(data)
            }).catch(()=>{

            });

              
        })
    }
}
</script>

<style lang="less" scoped>
    .BtnMusic{
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        .height{
            width: 100%;
            height: 40px;
        }
        a{
            text-decoration: none;
            color: black;
        }
        .hei{
            width: 100%;
            height: 20vh;
        }
        .back{
            width: 100%;
            height: 30px;
            text-align: left;
            margin-bottom: 10px;
            background-color: #fff;
            position: fixed;
            top: 0;
            img{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                float: left;
            }
            span{
                float: left;
                font-size: 25px;
                margin-left: 10px;
            }
        }
        .top{
            margin-left: 20px;
            margin-right: 20px;
            div{
                &:nth-child(1){
                    img{
                        width: 100px;
                        height: 100px;
                        border-radius: 10px;
                    }
                }
                &:nth-child(2){
                    width: 100px;
                    flex: 1;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
    }
</style>