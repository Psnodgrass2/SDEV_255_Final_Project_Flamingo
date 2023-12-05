<template>
  <v-main style="min-height: 1000px">
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
              <v-btn density="compact" :to="`/course/edit/${item.id}`">Edit</v-btn>
              <v-btn density="compact" :to="`/course/delete/${item.id}`" color="red">Delete</v-btn>
            </v-btn-group>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-main>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    courses: [],
  }),
  async created() {
    this.courses = (await axios.get('http://localhost:3000/courses')).data;
    console.log(this.courses)
  }
}
</script>
