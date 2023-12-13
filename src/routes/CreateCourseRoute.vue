<template>
  <v-main v-if="course" style="min-height: 1000px">
    <h2 class="text-h2 justify-center d-flex mb-6">Create a New Course</h2>

    <p v-if="message">{{ message }}</p>
    <p v-if="!isTeacher">You cannot create courses as a student.</p>
    <form v-if="isTeacher">
      <v-text-field v-model="course.name" label="Course Name" required></v-text-field>
      <v-text-field v-model="course.subjectArea" label="Course Subject Area" required></v-text-field>
      <v-text-field v-model="course.creditHours" label="Course Credit Hours" required></v-text-field>
      <v-textarea v-model="course.description" label="Course Description" required></v-textarea>
    </form>

    <v-btn @click="submitForm" v-if="isTeacher">
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
      isTeacher: false,
    },
    message: null,
  }),
  async created() {
    try
    {
      this.pizza = localStorage.getItem('userId')
    }
    catch(err){console.error(err)}
    await this.checkAuthentication();
  },
  methods: {
      
    async checkAuthentication() {
      try {
        const config =  {headers:{'authorization': this.pizza}}
        const response = await axios.get('https://m08finalprojectbackend.phillipsnodgras.repl.co/auth/check', config);
        console.log(response.data); // Response will contain { authenticated: true, isTeacher: true/false }
        if(response.authenticated ==false)
        {
          this.$router.push('/login');
        }
        else if (response.isTeacher == false) {
          this.$router.push('/login');
        }

      }catch(error) {
        console.error('Authentication check failed:', error);
        this.$router.push('/login');
      }
    },
    async submitForm() {
      try {
        const config = 
        {headers:{
          'authorization': this.pizza
        }}
        await axios.post('https://m08finalprojectbackend.phillipsnodgras.repl.co/course/create', this.course, config)
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
