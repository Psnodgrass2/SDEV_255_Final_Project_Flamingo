<template>
  <div id = 'app'>
    <messages-text />
  </div>
</template>

<script>
import MessageText from './components/MessagesText.vue'

export default {
  name: 'App',
  components: {
    'messages-text': MessageText
  }
}
</script>


