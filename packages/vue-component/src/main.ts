import Vue, { CreateElement } from 'vue'
import App from '~/App.vue'
import Components from './packages'

Vue.config.productionTip = false
Vue.use(Components.Plugin)

new Vue({
  render: (h: CreateElement) => h(App)
}).$mount('#app')
