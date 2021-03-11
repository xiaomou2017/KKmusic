<template>
    <li @click="playMusic">
      <slot></slot>
      <div class="left">
          <div>{{item.name}}</div>
          <p>
            <span v-if="item.song.privilege.maxbr>320000">SQ</span>
            {{item.song.artists[0].name}}-{{item.name}}</p>
      </div>
      <div class="right">
        <span></span>
      </div>
     </li> 

</template>
<script>
export default {
    props:{
      item:Object,
      num:{
        type:Number,
        default:0
      }
    },
    methods: {
      playMusic(){
        this.$root.playingMusic.musicID=this.item.id
      }
    },
    filters:{
      formatNum(val){
        return val<10?"0"+val:val;
      }
    }
}
</script>
<style lang="less" scoped>
li{
  &:nth-child(1){
    color: red;
  }
  &:nth-child(2){
    color: red;
  }
  &:nth-child(3){
    color: red;
  }
    display: flex;
    margin-top:10px;
    padding-left:10px;
    div.left{
      flex:1;
      text-align: left;
      border-bottom: 1px solid #ddd;
      div{
          font-size:17px;
          color: black;
      }
      p{
          font-size:12px;
          color:#888;
          padding:5px 0px;
          span{
            border: 1px solid red;
            color: red;
          }
      }
    }
    div.right{
      border-bottom: 1px solid #ddd;
      padding:0px 5px;
      display: flex;
      align-items: center;
      margin-top: 10px;
      span{
        display: inline-block;
        width:22px;
        height:22px;
        background-image: url(../assets/index_icon_2x.png);
        background-position: -24px 0px;
        background-size: 166px 97px;
      }
    }
  }
</style>