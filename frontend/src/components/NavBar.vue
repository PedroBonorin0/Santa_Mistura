<template>
  <nav>
    <router-link to="/"><img :src="imgPath" alt="Logo Santa Mistura"></router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      imgPath: '/img/logo.png'
    }
  },
};
</script>

<style scoped>
  nav {
   background-color: #CC5036;
   height: 12vh;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: center;
   padding: 5px 50px;
  }

  img {
    height: 12vh;
  }
</style>
|