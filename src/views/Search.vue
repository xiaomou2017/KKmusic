<template>
  <div>
    <div class="height"></div>
    <form @submit.stop.prevent="searchList(keywords)">
      <div class="search">
          <i></i>
          <input type="text" placeholder="输入歌手,歌曲" v-model="keywords"/>
          <i @click="cleat()" v-show="keywords"></i>
      </div>
      <div class="btn">
        <ul v-show="!keywords">
          <li v-for="(i,k) in musiclist" :key="k" @click="apen(i.first)">
            {{i.first}}
          </li>
        </ul>
      </div>
    </form>
    <Suggest v-show="showSearch" :suggests="suggests" :keywords="keywords" @searchResult="searchList"/>
    <Loading v-show="searching"/>
    <SearchResult v-show="showList " :searchMusicList="searchMusicList"/>
    <p ref="scrollbar"></p>
  </div>
</template>
<script>
import Suggest from '../components/Suggest'
import Loading from '../components/Loading'
import SearchResult from '../components/SearchResult'
export default {
  data(){
    return {
      keywords:'',
      suggests:[],
      searchMusicList:[],
      musiclist:[],
      searching:false,//是否显示 加载loading
      showList:false,//是否显示 搜索结果
      showSearch:false//是否显示 搜索提示
    }
  },
  created(){
      window.addEventListener('scroll',()=>{

      });
  },
  destroy(){
    window.removeEventListener('scroll');//一定要移除
  },
  methods:{
    cleat(){
      this.keywords = ''
    },
    apen(val){
      this.keywords=val
      // console.log(val)
    },
    
    listenScroll(){
        let scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//滚动距离
        let clientHeight=document.documentElement.clientHeight||document.body.clientHeight;//可是高度
        let barTop=this.$refs.scrollbar.offsetTop;//最后一个元素的距离顶部距离
        if(barTop<scrollTop+clientHeight){
          console.log(123)
        }

    },
      searchList(keywords){//点击确认搜索 显示搜索结果列表
        // this.keywords=keywords;
        this.showList=false;
        this.searching=true;
        this.showSearch=false;
        this.axios.get('/search?keywords='+keywords).then(d=>{//根据关键词得到搜索结果.
            if(d.data.code==200){
              this.showList=true;
              this.searching=false;
              this.searchMusicList=d.data.result.songs.map(dat=>{
                return {
                  name:dat.name,
                  id:dat.id,
                  song:{
                    artists:dat.artists,
                    privilege:{
                      maxbr:1
                    }
                  }
                }
              });
            }
        });
      }
  },
  beforeRouteEnter(to, from, next){
        next(vm=>{
                vm.$http.get('/search/hot/detail').then(data=>{
                  vm.musiclist=data.data.result.hots
                console.log(vm.musiclist)
            }).catch(()=>{

            });
        })
    },
  watch:{
    keywords(val){//输入关键字
      this.searching=true; //loadding要显示
      this.showList=false;
      this.suggests=[];
      this.$http.get('/search/suggest?keywords='+val).then(data=>{
        if( data.data.code==200&&data.data.result.order){
            let result=data.data.result;  
            let re=result.order.reduce((prev,v)=>{
                if(v!=='playlists'){
                    let rev=result[v];
                    return prev.concat(rev);
                }
                return prev;
            },[]);
            this.suggests=re;
            this.searching=false;
            this.showSearch=true;
            if(this.keywords==''){//判断如果搜索的字词已经全部删除为空.
              this.suggests=[];
            }
        }
      }).finally(()=>{
        this.searching=false;
      });
    }
  },
  components:{
    Suggest,
    Loading,
    SearchResult
  }
}
</script>
<style lang="less" scoped>
.height{
  height: 40px;
}
.search{
  display: flex;
  margin:10px;
  padding:5px 10px;
  background: #ebecec;
  border-radius: 20px;
  input{
        border:none;
        outline: none;
        flex:1;
        background-color: transparent;
  }
  i{
    display: inline-block;
    width:13px;
    height:13px;
    &:first-of-type{
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
    }
    &:last-of-type{
      margin-top: 3px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==);
    }
  }
}
.btn{
  ul{
    display: flex;
    flex-wrap: wrap;
    li{
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: grey;
      color: white;
      margin-top: 10px;
      margin-left: 20px;
      padding-right: 10px;
      border-radius: 50px;
      text-indent:10px
    }
  }
}
</style>