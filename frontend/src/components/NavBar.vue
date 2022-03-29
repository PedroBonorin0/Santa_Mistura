<template>
  <nav>
    <router-link to="/"><img :src="imgPath" alt="Logo Santa Mistura"></router-link>
    <div class="logout" @click="handleLogout">Logout</div>
  </nav>
</template>

<script>

export default {
  name: 'NavBar',

  data() {
    return {
      imgPath: '/img/logo.png',
    }
  },

  methods: {
    handleLogout() {
      this.$router.push('/login');  
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

  .logout {
    text-decoration: none;
    color: white;
    font-size: 20px;
    height: 30px;
    width: 80px;
    position: absolute;
    right: 100px;
    border: 1px solid #ddc4aa;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: .2s;
    cursor: pointer;
  }

  .logout:hover {
    background-color: #ddc4aa;
    color: #CC5036;
  }
</style>
|