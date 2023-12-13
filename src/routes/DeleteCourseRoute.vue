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
    pizza: "",
  }),
  async created() {
    try
    {
      this.pizza = localStorage.getItem('userId')
    }
    catch(err){console.error(err)}
    console.log(this.pizza);
    const config = 
    {headers:{
      'authorization': this.pizza
    }}
    console.log(config);
    try {
      await axios.post(`https://m08finalprojectbackend.phillipsnodgras.repl.co/course/delete/${this.$route.params.id}`, null , config)
      this.message = 'The course has been deleted.'
    } catch (err) {
      this.message = `Error: ${err.message}`
      console.log(err)
    }
  }
}
</script>
