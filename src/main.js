import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';

// import style directly

Vue.use(BootstrapVue);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
