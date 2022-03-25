<template>
  <div id="geral">
    <div class="card">
      <h1><img :src="logo" alt="Login"></h1>
      <form :action="loginRoute" method="post">
        <div class="labelInput">
          <label for="usernameInput" name="username">Usuário: </label>
          <input type="text" placeholder="Digite o usuário" v-model="username">
        </div>

        <div class="labelInput">
          <label for="passwordInput">Senha: </label>
          <input type="password" placeholder="Digite a senha" name="password" v-model="password">
        </div>

        <div class="buttons">
          <button v-if="users.length == 0" @click="criaUser">Criar</button>
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      logo: '/img/logo.png',
      users: [],
      userRoute: 'http://localhost:3031/api/users',
      loginRoute: 'http://localhost:3031/api/users/login',

      username: '',
      password:'',
    }
  },

  beforeMount() {
    this.getUsers();
  },

  methods: {
    async getUsers() {
      await axios.get(this.userRoute)
        .then(res => this.users = res.data)
        .catch(err => console.log(err))
    },
    async criaUser() {
      
    }
  },
}
</script>

<style scoped>
  #geral {
    display: flex;
    height: 75vh;
    align-items: center;
  }
  
  .card {
    background: #CC5036;
    padding: 10px 30px;
    width: 350px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: auto;
  }

  .card img {
    padding-top: 5px;
    width: 250px;
  }

  .labelInput {
    color: white;
    display: flex;
    font-size: 20px;
    margin: 15px 0;
  }

  .labelInput input{
    margin-left: 5px;
    padding: 3px;
    width: -webkit-fill-available;
    border: 1px solid #333333;
    border-radius: 4px;
  }

  .labelInput input:focus{
    outline: 0;
  }

  .card button {
    background-color: #f8e6d4;
    width: 80px;
    height: 24px;
    margin: 0 10px;
    border: 1px solid white;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;
  }

  .card button:hover {
    background-color: #dfcebe;
  }
</style>