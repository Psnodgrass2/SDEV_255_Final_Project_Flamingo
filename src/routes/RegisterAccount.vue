<template>
    <v-main v-if="user" style="min-height: 1000px">
      <h2 class="text-h2 justify-center d-flex mb-6">Register an Account</h2>
  
      <p v-if="message">{{ message }}</p>
      
      <form>
        <v-text-field v-model="user.username" label="User Name" required></v-text-field>
        <v-text-field v-model="user.password" label="Password" required></v-text-field>
        <v-checkbox v-model="user.isTeacher" label="Is Teacher?"></v-checkbox>
      </form>
  
      <v-btn @click="submitForm">
        Register
      </v-btn>
    </v-main>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data: () => ({
      user: {
        username: '',
        password: '',
        isTeacher: 0,
      },
      message: null,
    }),
    methods: {
      async submitForm() {
        try {
          await axios.post('http://localhost:3000/register', this.user)
          this.message = 'The user has been created.'
          this.$router.push('/account')

        } catch (err) {
          this.message = 'There was an error creating the user.'
          console.log(err)
        }
      },
    }
  }
  </script>
  