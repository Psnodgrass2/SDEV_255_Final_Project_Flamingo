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
      pizza: "",
    },
    message: null,
  }),
  async created() {
    try
    {
      this.pizza = localStorage.getItem('isTeacher')
    }
    catch(err){console.error(err)}
    const config = 
      {headers:{
        'authorization': this.pizza
      }}
    try {
      this.courses = (await axios.get('https://m07finalprojectbackend.phillipsnodgras.repl.co/courses', config)).data;
      console.log(this.courses)
    } catch (error) {
      this.$router.push('/login');
    }

  },
  methods: {
    async submitForm() {
      try {
        await axios.post('https://m07finalprojectbackend.phillipsnodgras.repl.co/course/create', this.course)
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
