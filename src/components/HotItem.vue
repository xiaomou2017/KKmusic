<template>
    <ul class="MusicHotList">
        <router-link v-for="(d,i) in MusicHotList" :key="d.id" to="/" tag="li">
            <div class="left">
                <span>{{i+1}}</span>
                <div>{{d.name}}</div>
                
                <p><span v-if="d.song.privilege.maxbr > 320000">SQ</span>{{d.song.artists[0].name}} - {{d.name}}</p>
            </div>
            <div class="right">
                
            </div>
        </router-link>
    </ul>
</template>
<script>
export default {
    name:"MusicItem",
    props:{
        MusicHotList:Array
    }
}
</script>

<style lang="less" scoped>
*{
    margin: 0;
    padding: 0;
}
    .MusicHotList{
        li{
    display: flex;
    margin-top:10px;
    padding-left:10px;
    div.left{
      flex:1;
      text-align: left;
      border-bottom: 1px solid #ddd;
      margin-left: 20px;
      span{
          margin: 10px;
          font-size: 18px;
          position: absolute;
          left: 0;
      }
      div{
          font-size:17px;
          color: black;
      }
      p{
            font-size:12px;
            color:#888;
            padding:5px 0px;
            margin-left: 20px;
            span{
                color: red;
                border: 1px solid red;
                font-size: 12px;
                margin-left: 30px;
                margin-top: 5px;
            }
      }
      
    }
    div.right{
      border-bottom: 1px solid #ddd;
      padding:0px 5px;
      display: flex;
      align-items: center;
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
}

</style>