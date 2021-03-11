<template>
<div>
  <ul class="newMusicList">
    <ListItem v-for="item in newMusicList" @playMusic="$emit('playMusic',item.id)" :item="item" :key="item.id"></ListItem>
  </ul>
  <div class="hei"></div>
  <Loading v-if="newMusicList.length<=0"/>
</div>
</template>
<script>
import Loading from './Loading'
import ListItem from './ListItem'
export default {
  name:"MusicItem",
  props:{
    newMusicList:{
      
      type:Array,
      default:function(){
        return []
      }
    }
  },
  components:{
    Loading,
    ListItem
  }
}
</script>
<style lang="less" scoped>
  div{  
    .newMusicList{
      width: 100%;
      background: url(../assets/recommand_bg_2x.png)no-repeat;
      background-size: 200vh;
    }
  }
  .hei{
    height: 20vh;
  }
</style>