<template>
    <div>
        <h4 class="text-h4">Messages</h4>
<v-card class="mx-auto" max-width="300">
    <v-list :items="messages">
       
    </v-list>
</v-card>
        
    </div>
</template>

<script>
  export default {
    data: () => ({
      messages: [
        {
          title: 'hi',
          value: 1,
        },
        {
          title: 'hello',
          value: 2,
        },
        {
          title: "it's working",
          value: 3,
        },
      ],
    }),
  }
</script>