<template>
    <v-layout class="rounded rounded-md">
        <a href = "index.html"><v-app-bar title = "Course Modification Application"></v-app-bar></a>
  
      <v-navigation-drawer>
        <v-list>
          <v-list-item title="Course List:"></v-list-item>
          <v-list-item>Placeholder</v-list-item>
          <v-list-item>Placeholder</v-list-item>
          <v-list-item>Placeholder</v-list-item>
          <v-list-item>Placeholder</v-list-item>
          <v-list-item>Placeholder</v-list-item>
          <v-list-item>Placeholder</v-list-item>

        </v-list>
      </v-navigation-drawer>
  
      <v-main style="min-height: 1000px;">
        <div class=".textcontent pa-md-4">
        <h2 class="text-h2 justify-center d-flex mb-6">Welcome to the Class Management Tool</h2>
        <p class = "d-flex justify-start mb-6 bg-surface-variant pa-2">From here you will be able to:</p>
        <v-list lines="one">
        <v-list-item>Create new classes.</v-list-item>
        <v-list-item>Edit the rosters of classes you have access to.</v-list-item>
        <v-list-item>View the rosters of existing classes</v-list-item>
        <v-list-item>Delete courses you have created.</v-list-item>
        <v-list-item>The courses will be displayed in the course list on the left side after you've logged in, and each teacher will only see courses they've created.</v-list-item>
        <v-list-item>Maybe a student list that can go using a linked key in the database that allows you to view which class each student is in?</v-list-item>
        <v-list-item>The majority of the project will be done in the backend, and will attempt to update the page without needing to reload.</v-list-item>
</v-list>
        </div>
      </v-main>
    </v-layout>
  </template>

<style>

.textcontent{
    padding: 16px;
}
</style>

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

