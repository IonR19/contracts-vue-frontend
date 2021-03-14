import "devextreme/dist/css/dx.common.css";
import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.css";
import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import appInfo from "./app-info";

import mystore from "./store/index";

Vue.config.productionTip = false;
Vue.prototype.$appInfo = appInfo;

import PopUp from "./components/General/PopupWloading.vue";
Vue.component("popup-loading", PopUp);

const app = new Vue({
  router,
  store: mystore,
  render: (h) => h(App),
}).$mount("#app");
