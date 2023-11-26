<template>
    <div>
        <h4>Messages</h4>
        <ul v-for="message in messages" :key="message.id">
            <li>{{message}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            messages: ["hello", "hi", "it's working"]
        }
    }
}
</script>