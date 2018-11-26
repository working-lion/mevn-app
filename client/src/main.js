// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/plugins/bootstrap'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  data: {
    logo: 'LOGO',
    footer_logo: 'FOOTER_LOGO'
  },
  router,
  components: { App },
  template: '<App/>'
})
