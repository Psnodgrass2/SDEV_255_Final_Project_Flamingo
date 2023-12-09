<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link to="/"><v-toolbar-title>Course Modification Application</v-toolbar-title></router-link>
      </v-app-bar>

      <v-main style="min-height: 1000px">
        <v-navigation-drawer v-model="drawer" location="left">
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" to="/"></v-list-item>
            <v-list-item prepend-icon="mdi-chair-rolling" title="Courses" value="courses" to="/courses"></v-list-item>
            <v-list-item prepend-icon="mdi-folder-plus" title="Create Course" value="create-course" to="/create/course"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="My Account" value="account" to="/account"></v-list-item>
            <v-list-item prepend-icon="mdi-account-plus" title="Register" value="register" to="/register"></v-list-item>
            <v-list-item prepend-icon="mdi-login" title="Login" value="login" to="/login"></v-list-item>
            <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout" to="/logout"></v-list-item>
          </v-list>
        </v-navigation-drawer>

        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-app>
  
</template>

<script>
export default {
  name: "App",

  components: {
  },

  data: () => ({
    drawer: false,
  }),
};
</script>
<style>

</style>