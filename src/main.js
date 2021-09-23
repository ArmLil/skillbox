import Vue from "vue";
import App from "./App.vue";
import { data1, data2 } from "./data1";
import showAlert from "./showAlert";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

showAlert(data1);
showAlert(data2);
