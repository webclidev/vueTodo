import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Vuetify)
new Vue({
  render: h => h(App),
  store
}).$mount('#app')
