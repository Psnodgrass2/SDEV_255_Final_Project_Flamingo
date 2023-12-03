<template>
  <v-main v-if="course" style="min-height: 1000px">
    <p v-if="message">{{ message }}</p>
    <form>
      <v-text-field v-model="course.name" label="Course Name" required></v-text-field>
      <v-text-field v-model="course.subjectArea" label="Course Subject Area" required></v-text-field>
      <v-text-field v-model="course.creditHours" label="Course Credit Hours" required></v-text-field>
      <v-textarea v-model="course.description" label="Course Description" required></v-textarea>
    </form>

    <v-btn @click="submitForm">
      Save Changes
    </v-btn>
  </v-main>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    course: null,
    message: null,
  }),
  async created() {
    try {
      this.course = (await axios.get(`http://localhost:3000/course/${this.$route.params.id}`)).data;
      console.log(this.course)
    } catch (err) {
      this.error = err
      alert(err)
    }
  },
  methods: {
    async submitForm() {
      try {
        await axios.post(`http://localhost:3000/course/update/${this.$route.params.id}`, this.course)
        this.message = 'The course has been updated.'
      } catch (err) {
        this.message = 'There was an error updating the course.'
        console.log(err)
      }
    },
  }
}
</script>
