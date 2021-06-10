import Vue from 'vue'
import Demo from '@/components/demo.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from '@/routes.js'
import * as echarts from 'echarts';
import store from "@/store";
import VuePapaParse from 'vue-papa-parse'
import VueSocialSharing from 'vue-social-sharing'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter, faFacebook, faStackOverflow, faGithub} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTwitter, faFacebook, faStackOverflow, faGithub, faEnvelope )
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueSocialSharing);
//import 'jquery/src/jquery.js'

Vue.use(VuePapaParse)
Vue.prototype.$echarts = echarts
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes
})


new Vue({
  render: h => h(Demo),
  router:router,
  store,
}).$mount('#app')
