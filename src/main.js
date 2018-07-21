import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from "axios"

if(localStorage.getItem("token") != null) {
  console.log('You are signed in: ', localStorage.getItem("token"))
  axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
}
else {
  console.log('You are not signed in!')
}

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
