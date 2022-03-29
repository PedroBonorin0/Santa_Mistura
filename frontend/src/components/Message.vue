<template>
  <div class="container-message">
    <h1 class="message-text">{{ message }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Message',

  props: {
    message: { type: String, required: true }
  }
}
</script>

<style scoped>
  .container-message {
    background: #CC5036;
    border-radius: 4px;
    width: 300px;
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
  }

  .message-text {
    color: white;
    font-size: 20px;
  }
</style>