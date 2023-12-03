import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import {createRouter, createWebHashHistory} from "vue-router";

loadFonts()

import IndexRoute from './routes/IndexRoute'

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: IndexRoute },
  ]
})

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')
