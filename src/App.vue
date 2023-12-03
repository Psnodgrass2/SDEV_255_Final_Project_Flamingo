<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <router-link to="/"><v-app-bar title="Course Modification Application"></v-app-bar></router-link>

      <v-navigation-drawer>
        <v-list>
          <v-list-item title="Course List:"></v-list-item>
          <v-list-item>Placeholder</v-list-item>
          <v-list-item>Placeholder</v-list-item>
          <v-list-item>Placeholder</v-list-item>
          <v-list-item>Placeholder</v-list-item>
          <v-list-item>Placeholder</v-list-item>
          <v-list-item>Placeholder</v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-navigation-drawer permanent location="right">
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" to="/"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account" to="/account"></v-list-item>
          <v-list-item prepend-icon="mdi-login" title="Login" value="login" to="/login"></v-list-item>
          <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout" to="/logout"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 1000px">
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
