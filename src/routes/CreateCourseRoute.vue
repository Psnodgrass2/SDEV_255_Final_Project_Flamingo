<template>
  <v-main v-if="course" style="min-height: 1000px">
    <h2 class="text-h2 justify-center d-flex mb-6">Create a New Course</h2>

    <p v-if="message">{{ message }}</p>
    
    <form>
      <v-text-field v-model="course.name" label="Course Name" required></v-text-field>
      <v-text-field v-model="course.subjectArea" label="Course Subject Area" required></v-text-field>
      <v-text-field v-model="course.creditHours" label="Course Credit Hours" required></v-text-field>
      <v-textarea v-model="course.description" label="Course Description" required></v-textarea>
    </form>

    <v-btn @click="submitForm">
      Create Course
    </v-btn>
  </v-main>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    course: {
      name: '',
      subjectArea: '',
      creditHours: 0,
      description: '',
    },
    message: null,
  }),
  methods: {
    async submitForm() {
      try {
        await axios.post('http://localhost:3000/course/create', this.course)
        this.message = 'The course has been created.'
        this.$router.push('/courses')
      } catch (err) {
        this.message = 'There was an error creating the course.'
        console.log(err)
      }
    },
  }
}
</script>
