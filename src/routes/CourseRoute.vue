<template>
  <v-main style="min-height: 1000px">
    <div v-if="!error && course">
      <h2 class="text-h2 justify-center d-flex mb-6">#{{ this.$route.params.id }} || {{ course.name }}</h2>
      <p class="text-small">{{ course.subjectArea }}</p>
      <p class="text-small">Credit Hours: {{ course.creditHours }}</p>
      <p>{{ course.description }}</p>
    </div>
  </v-main>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    course: null,
    error: false,
  }),
  async created() {
    try {
      this.course = (await axios.get(`http://localhost:3000/course/${this.$route.params.id}`)).data;
      console.log(this.course)
    } catch (err) {
      this.error = err
      alert(err)
    }
  }
}
</script>
