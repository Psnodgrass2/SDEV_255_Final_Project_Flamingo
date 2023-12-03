<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <router-link to="/"><v-app-bar title="Course Modification Application"></v-app-bar></router-link>

      <v-main style="min-height: 1000px">
        <v-navigation-drawer location="left">
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" to="/"></v-list-item>
          <v-list-item prepend-icon="mdi-chair-rolling" title="Courses" value="courses" to="/courses"></v-list-item>
          <v-list-item prepend-icon="mdi-folder-plus" title="Create Course" value="create-course" to="/create/course"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account" to="/account"></v-list-item>
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
    //
  }),
};
</script>
