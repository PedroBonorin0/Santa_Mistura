<template>
<div>
    <NavBar />
  <router-view />
</div>

</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: "App",
  components: {NavBar},
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
