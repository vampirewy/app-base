import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/reset.scss'
import GlobalListContainer from './components/GlobalListContainer.vue'

Vue.config.productionTip = false
Vue.__GLOBAL_POOL__ = {
  store,
  router,
}
Vue.component('GlobalListContainer', GlobalListContainer)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
