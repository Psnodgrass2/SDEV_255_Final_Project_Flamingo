import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import {createRouter, createWebHashHistory} from "vue-router";

loadFonts()

import IndexRoute from './routes/IndexRoute'
import CoursesRoute from './routes/CoursesRoute'
import CourseRoute from './routes/CourseRoute'

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: IndexRoute },
    { path: '/courses', component: CoursesRoute },
    { path: '/course/view/:id', component: CourseRoute },
  ]
})

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')
