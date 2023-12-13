<template>
    <v-main>
      <v-card>
        <p>Welcome, {{ usernm }}!</p>
        <p>User ID: {{ usereed }}</p>
        <v-container v-if="!isTeacher">
          <v-toolbar>
            <v-toolbar-title style="margin-left: 16px;">Classes</v-toolbar-title>
          </v-toolbar>

          <v-card>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Description
                  </th>
                  <th class="text-left">
                    Subject
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in courses" :key="index">
                  <td>{{ item.classname }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.subjectArea }}</td>
                  <td class="text-right">
                    <!-- Add your actions here, e.g., buttons, icons, etc. -->
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-container>
      </v-card>
    </v-main>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        usernm: "",
        usereed: "",
        pizza:"",
        courses: [],
        isTeacher:false,
      };
    },
  
    async created() {
      // Fetch user information including userId
      this.usereed = localStorage.getItem('userId');
      this.usernm = localStorage.getItem('userName');
      try
      {
        this.pizza = localStorage.getItem('userId')
      }
      catch(err){console.error(err)}
      this.checkAuthentication()
      try {
        const config =  {headers:{'authorization': this.pizza}}
        const response = await axios.get('https://m08finalprojectbackend.phillipsnodgras.repl.co/studentclasslist', config);
        console.log(response.data);
        this.courses = response.data;
      } catch (error) {
        console.error('Authentication check failed:', error);
      }
      
    },
    

    methods:{
      async checkAuthentication() {
        try {
          const config =  {headers:{'authorization': this.pizza}}
          const response = await axios.get('https://m08finalprojectbackend.phillipsnodgras.repl.co/auth/check', config);
          console.log(response.data); // Response will contain { authenticated: true, isTeacher: true/false }
          if(response.data.authenticated == false)
          {
            this.$router.push('/login');
          }
          else if (response.data.isTeacher == true) {
            this.isTeacher = true;
          }
          console.log(this.isTeacher);

        }catch(error) {
          console.error('Authentication check failed:', error);
          this.$router.push('/login');
        }
      },
    }
  };
  </script>
  