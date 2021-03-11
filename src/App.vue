<template>
  <div id="app">
    <TopNav v-show="$route.meta.showNav"></TopNav>
    <!-- router-view 是路由匹配到视图组件显示位置 -->
    <div>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <Play :musicID="$root.playingMusic.musicID"></Play>
  </div>
</template>
<script>
//App.vue也是组件. 是根组件
import TopNav from "./components/TopNav";
import Play from './components/Play';
export default {
  components: {
    TopNav,
    Play
  },
  methods:{
    playMusic(id){
        this.musicID=id;
    }
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}
/* kele88.cn */
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
