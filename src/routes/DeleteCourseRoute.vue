<template>
  <v-main style="min-height: 1000px">
    <p v-if="message">{{ message }}</p>
  </v-main>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    message: 'Deleting course...',
  }),
  async created() {
    try {
      await axios.post(`https://m07finalprojectbackend.phillipsnodgras.repl.co/course/delete/${this.$route.params.id}`)
      this.message = 'The course has been deleted.'
    } catch (err) {
      this.message = `Error: ${err.message}`
      console.log(err)
    }
  }
}
</script>
