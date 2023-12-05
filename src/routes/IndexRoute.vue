<template>
  <v-main style="min-height: 1000px">
    <div class=".textcontent pa-md-4">
      <h2 class="text-h2 justify-center d-flex mb-6">
        Welcome to the Class Management Tool
      </h2>
      <p class="d-flex justify-start mb-6 bg-surface-variant pa-2">
        From here you will be able to:
      </p>
      <v-list lines="one">
        <v-list-item>Create new classes.</v-list-item>
        <v-list-item>Edit the rosters of classes you have access to.</v-list-item>
        <v-list-item>View the rosters of existing classes</v-list-item>
        <v-list-item>Delete courses you have created.</v-list-item>
        <v-list-item>The courses will be displayed in the course list on the left side
          after you've logged in, and each teacher will only see courses they've
          created.</v-list-item>
        
      </v-list>
    </div>
  </v-main>
</template>

<script>
/*To be re-added when networking is implemented*/
/*import axios from 'axios';

export default {
  data: () => ({
    messages: [],
  }),
  async created()
  {
  this.messages = (await axios.get('http://localhost:3000/messages')).data;
  return
  }
}
*/
</script>
