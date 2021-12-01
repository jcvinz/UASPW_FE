import Vue from 'vue'
import App from './App.vue'
import vuetify from "@/plugins/vuetify";
import router from "./router";
import axios from "axios";
import { BootstrapVue } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false

Vue.use(BootstrapVue);

Vue.prototype.$http = axios;
Vue.prototype.$api = 'http://127.0.0.1:8000/api';

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
