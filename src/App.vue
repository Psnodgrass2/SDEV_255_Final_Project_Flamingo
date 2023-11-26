<template>
  <v-app>
    <v-main>
      <MessagesText/>
    </v-main>
  </v-app>
</template>

<script>
import MessagesText from './components/MessagesText.vue'

export default {
  name: 'App',

  components: {
    MessagesText,
  },

  data: () => ({
    //
  }),
}
</script>
