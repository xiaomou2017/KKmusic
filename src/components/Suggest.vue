<template>
  <ul class="suggests">
    <li class="btn" v-if="keywords!=''">搜索:<span>{{keywords}}</span></li>
    <li class="hua" v-for="s in suggests" :key="s.id" @click="$emit('searchResult',s.name)">{{s|filtType}}{{s.name}}</li>
  </ul>
</template>
<script>
export default {
  props:{
    suggests:{
      type:Array,
      default:function(){
        return [];
      }
    },
    keywords:String
  },
  filters:{
    filtType(v){
      if(typeof v.artists !='undefined'){
        return '歌曲:'
      }else if(typeof v.artist !='undefined'){
        return '专辑:'
      }else{
        return '歌手:'
      }
    }
  }
}
</script>
<style lang="less">
  .suggests{
    li{
      height: 30px;
      text-align: left;
      padding-left:15px;
      border-bottom: 1px solid #eff0f1;
    }
    .btn{
      font-size: 20px;
      span{
        color: red;
      }
    }
    .hua{
      height: 30px;
      line-height: 30px;
      margin-top: 15px;
      margin-left: 20px;
    }
  }
</style>