<template>
    <div>
        <TopNav />
        <div class="hei"></div>
        <div class="more">
            <div class="top">
                <ul>
                    <li><span>华语</span></li>
                    <li><span>欧美</span></li>
                    <li><span>韩国</span></li>
                    <li><span>日本</span></li>
                </ul>
            </div>
            <div class="btn">
                <ul class="moes">
                    <router-link :to="{path:'/BtnMusic/'+item.id}" v-for="(item,k) in nameList" :key="item.id" tag="li">
                        <i><span>{{k+1}}</span></i>
                        <i><img :src="item.picUrl" alt=""></i>
                        <i>
                            <div>{{item.name}}</div>
                            <div>
                                <span><img src="../assets/6.png" alt=""></span>
                                <span>{{item.score}}</span>
                            </div>
                            <div>
                                <span></span>
                                {{item.name}}
                            </div>
                        </i>
                    </router-link>
                </ul>
            </div>
        </div>
        <div class="hei1"></div>
    </div>
</template>

<script>
import TopNav from '../components/TopNav';
export default {
    data(){
        return{
            nameList:[]
        }
    },
    components:{
        TopNav
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
            vm.$http.get('/toplist/artist').then(data=>{//获取最新音乐列表
            vm.nameList=data.data.list.artists.slice(0,30)
            // console.log(data.data.list.artists)
            console.log(vm.nameList)
            }).catch(()=>{

            });
        })
    }
}
</script>

<style lang="less" scoped>
    .hei{
        height: 42px;
    }
    .hei1{
        height: 25vh;
    }
    .more{
        .top{
            ul{
                display: flex;
                li{
                    flex: 1;
                    margin-top: 5px;
                    
                    &:nth-child(1){
                        color: red;
                        span{
                            border-bottom: 3px solid red;
                        }
                    }
                }
            }
            
        }
        .btn{
            ul.moes{
                li{
                    display: flex;
                    margin-top: 5px;
                    //i
                    i{
                        flex: 1;
                        &:nth-child(1){
                            flex: 1;
                            font-size: 24px;
                            margin-top: 20px;
                            span{
                                border-bottom: 1px solid black;
                            }
                        }
                        &:nth-child(2){
                            img{
                                border-radius: 10px;
                            }
                            flex: 1;
                        }
                        &:nth-child(3){
                            color: black;
                            text-align: left;
                            margin-left: 10px;
                            flex: 2;
                            div{
                                &:nth-child(2){
                                    color: #c4c4c4;
                                    font-size: 12px;
                                    display: flex;
                                    span{
                                        &:nth-child(1){
                                            img{
                                                width: 25px;
                                                height: 25px;
                                            }   
                                        }
                                        &:nth-child(2){
                                            margin-top: 7px;
                                        }
                                    }

                                }
                                &:nth-child(3){
                                    width: 100%;
                                    border-radius: 30px;
                                    font-size: 14px;
                                    color: #98a7b4;
                                    text-indent:1em;
                                    background-color: #f3f3f3;
                                }
                            }
                        }
                    }

                    //li
                    &:nth-child(1){
                        color: red;
                    }
                    &:nth-child(2){
                        color: red;
                    }
                    &:nth-child(3){
                        color: red;
                    }
                }
            }
        }
    }

</style>