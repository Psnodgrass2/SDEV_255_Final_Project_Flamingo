<template>
  <v-main style="min-height: 1000px">
    <v-toolbar-title style="margin-left: 16px;">Classes</v-toolbar-title>
   
    <v-card>
    <v-table>
      
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Description
          </th>
          <th class="text-left">
            Subject
          </th>
          <th class="text-right">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in courses" :key="index">
          <td>{{ item.id }}</td>
          <td><router-link :to="`/course/view/${item.id}`">{{ item.name }}</router-link></td>
          <td>{{ item.description }}</td>
          <td>{{ item.subjectArea }}</td>
          <td class="text-right">
            <v-btn-group divided variant="outlined">
              <v-btn density="compact" :to="`/course/view/${item.id}`">View</v-btn>
              <!-- Conditionally render edit and delete buttons based on isTeacher value -->
              <v-btn v-if="isTeacher" density="compact" :to="`/course/edit/${item.id}`">Edit</v-btn>
              <v-btn v-if="isTeacher" density="compact" :to="`/course/delete/${item.id}`" color="red">Delete</v-btn>
              <v-btn v-if="!isTeacher" density="compact" @click="addToCart(item)">Add to cart</v-btn>
              
            </v-btn-group>
          </td>
        </tr>
      </tbody>
    </v-table>
      </v-card>
    <!-- Second list for non-teachers -->
    <v-table v-if="!isTeacher">
      <v-toolbar-title style="margin-left: 16px;">Shopping Cart</v-toolbar-title>
      <v-card>
        
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                ID
              </th>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Description
              </th>
              <th class="text-left">
                Subject
              </th>
              <th class="text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in shoppingCart" :key="index">
              <td>{{ item.id }}</td>
              <td><router-link :to="`/course/view/${item.id}`">{{ item.name }}</router-link></td>
              <td>{{ item.description }}</td>
              <td>{{ item.subjectArea }}</td>
              <td class="text-right">
                <!-- Adjust the actions as needed for the shopping cart -->
                <v-btn-group divided variant="outlined">
                  <v-btn v-if="!isTeacher" density="compact" @click="removeFromCart(item)">Remove From Cart</v-btn>
                  <v-btn density="compact" :to="`/course/view/${item.id}`">View</v-btn>
                  <!-- You may want to add more actions specific to the shopping cart here -->
                </v-btn-group>
              </td>
            </tr>
          </tbody>
        </v-table>
        <p ref="shoppingcartemptytext" style="margin-left: 16px;">Shopping Cart is Empty</p>
      </v-card>

    </v-table>
    <p v-if="message">{{ message }}</p>
    <v-btn density="compact" v-if="!isTeacher" @click="purchaseCourses()">Checkout</v-btn>
  </v-main>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    courses: [],
    pizza: "",
    isTeacher: false,
    shoppingCart: [],
  }),
  methods:
  {
    addToCart(item) {
    // Add the selected item to the shopping cart
    this.shoppingCart.push(item);

    // Remove the selected item from the list of courses
    this.courses = this.courses.filter(course => course.id !== item.id);

    // Check if the shopping cart is empty
    if (this.shoppingCart.length === 0) {
      // You may want to display a message or perform other actions here
    this.$refs.shoppingcartemptytext.textContent = "Shopping cart is empty.";
    }
    else
    {
    this.$refs.shoppingcartemptytext.textContent = "";
    }
      console.log(this.shoppingCart);
    },
    removeFromCart(item) {
    // Add the selected item to the shopping cart
    this.courses.push(item);

    // Remove the selected item from the list of courses
    this.shoppingCart = this.shoppingCart.filter(course => course.id !== item.id);

    // Check if the shopping cart is empty
    if (this.shoppingCart.length === 0) {
      // You may want to display a message or perform other actions here
      this.$refs.shoppingcartemptytext.textContent = "Shopping cart is empty.";
    }
    else
    {
      this.$refs.shoppingcartemptytext.textContent = "";
    }
    },
    async purchaseCourses() {
      const config =  {headers:{'authorization': this.pizza}}
      const response = await axios.post('https://m08finalprojectbackend.phillipsnodgras.repl.co/checkout',this.shoppingCart, config);
      console.log(response);
      console.log(response.data);
      if (response.data.message == 'Courses inserted successfully')
      {
        this.$router.push('/account');
      }
      else
      {
        this.message = "There was an error purchasing the classes.;"
      }
    },
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
    
  },
  async created() {
    try
    {
      this.pizza = localStorage.getItem('userId')
    }
    catch(err){console.error(err)}
    const config = 
      {headers:{
        'authorization': this.pizza
      }}
    try {
      this.courses = (await axios.get('https://m08finalprojectbackend.phillipsnodgras.repl.co/courses', config)).data;
    } catch (error) {
      this.$router.push('/login');
    }
    this.checkAuthentication();
  }
  
}
</script>
