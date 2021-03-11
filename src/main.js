import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import 'lib-flexible';
import { Popup } from 'vant'

Vue.use(Popup);

Vue.config.productionTip = false
let playingMusic = {
  musicID:0
}

new Vue({
  router,
  data:{
    playingMusic
  },
  render: h => h(App)
}).$mount('#app')
