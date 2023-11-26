<template>
  <v-app>
      <MessagesText/>
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
