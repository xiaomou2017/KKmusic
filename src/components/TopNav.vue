<template>
<div>
  <ul class="topnav">
    <li><router-link tag="a" to="/">推荐音乐</router-link></li>
    <li><router-link tag="a" to="/hot">热歌榜</router-link></li>
    <li><router-link tag="a" to="/more">更多</router-link></li>
    <li><router-link tag="a" to="/search">搜索</router-link></li>
  </ul>
</div>
</template>
<script>
export default {
    methods: {
      
    },
    
}
</script>
<style lang="less" scoped>
.topnav{
  display: flex;
  width: 100%;
  border-bottom:1px solid #ddd;
  background-color: #fff;
  position: fixed;
  margin-top: 0px;
  li{
    line-height: 40px;
    flex:1 1 auto;
    font-size:15px;
    a{
      display: inline-block;
      text-decoration: none;
      color:#000;
      &.router-link-exact-active{
        color:red;
        border-bottom:2px solid red;
      }
    }
  }
}
</style>