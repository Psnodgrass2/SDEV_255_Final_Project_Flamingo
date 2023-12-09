<template>
    <v-main v-if="course" style="min-height: 1000px">
      <h2 class="text-h2 justify-center d-flex mb-6">Log Out</h2>
  
  
      <v-btn @click="submitForm">
        Logout
      </v-btn>
    </v-main>
  </template>
  
  <script>
  
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
        localStorage.setItem('userId', null);
          localStorage.setItem('userName', null);
          localStorage.setItem('isTeacher', null);
        this.$router.push('/');
        } catch (err) {
          this.message = 'Cannot log out while not logged in'
          console.log(err)
        }
      },
    }
  }
  </script>
  