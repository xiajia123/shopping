import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "dayjs";
import http from "./http";
import lodash from "lodash";
import Vant from "vant";
import "vant/lib/index.css";
import FastClick from "fastclick";
import "lib-flexible";
FastClick.attach(document.body);
Vue.use(Vant);
Vue.config.productionTip = false;
Vue.prototype.$axios = http;
Vue.prototype.$moment = moment;
Vue.prototype.$lodash = lodash;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
