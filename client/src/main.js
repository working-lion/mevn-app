// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import {store} from './store';

Vue.config.productionTip = false

export const bus = new Vue();

new Vue({
  el: '#app',
  data: {
  },
  store,
  router,
  components: { App },
  template: '<App/>',
  methods: {
    init() {
      this.$store.dispatch('GET_STATUSES', []);
      this.$store.dispatch('GET_VERSIONS', []);
      this.$store.dispatch('GET_PRIORITIES', []);
      this.$store.dispatch('GET_TYPES', []);
      this.$store.dispatch('GET_USERS', []);
      this.$store.dispatch('GET_FILTERS', {
        version: this.$store.getters.VERSIONS,
        priority: this.$store.getters.PRIORITIES,
        type: this.$store.getters.TYPES
      });
      this.$store.dispatch('GET_TASKS', []);
    }
  },
  created: function () {
    this.init();
  }
})
