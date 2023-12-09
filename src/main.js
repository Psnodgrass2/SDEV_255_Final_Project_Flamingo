import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import {createRouter, createWebHashHistory} from "vue-router";

loadFonts()

import IndexRoute from './routes/IndexRoute'
import CoursesRoute from './routes/CoursesRoute'
import CourseRoute from './routes/CourseRoute'
import EditCourseRoute from './routes/EditCourseRoute'
import DeleteCourseRoute from './routes/DeleteCourseRoute'
import CreateCourseRoute from './routes/CreateCourseRoute'
import RegisterAccount from './routes/RegisterAccount'
import LoginAccount from './routes/LoginAccount'
import LogoutAccount from './routes/LogoutAccount'
import MyAccount from './routes/MyAccount'

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: IndexRoute },
    { path: '/courses', component: CoursesRoute },
    { path: '/course/view/:id', component: CourseRoute },
    { path: '/course/edit/:id', component: EditCourseRoute },
    { path: '/course/delete/:id', component: DeleteCourseRoute },
    { path: '/create/course', component: CreateCourseRoute },
    { path: '/register', component: RegisterAccount },
    { path: '/login', component: LoginAccount },
    { path: '/logout', component: LogoutAccount },
    { path: '/account', component: MyAccount },
  ]
})

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')
