<template>
  <div id="geral">
    <Message v-show="showErrorMessage" :message="errorMessage"/>
    <div class="card">
      <h1><img :src="logo" alt="Login"></h1>
      <form @submit.prevent="handleSubmit">
        <div class="labelInput">
          <label for="usernameInput" name="username">Usuário: </label>
          <input type="text" placeholder="Digite o usuário" v-model="username">
        </div>

        <div class="labelInput">
          <label for="passwordInput">Senha: </label>
          <input type="password" placeholder="Digite a senha" name="password" v-model="password">
        </div>

        <div class="buttons">
          <button v-if="users.length == 0" type="submit">Criar</button>
          <button v-else type="submit">Entrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Message from '../components/Message.vue';

export default {
  components: { Message },
  data() {
    return {
      logo: '/img/logo.png',
      users: [],

      showErrorMessage: false,
      errorMessage: '',

      username: '',
      password:'',
    }
  },

  beforeMount() {
    this.getUsers();
  },

  methods: {
    async getUsers() {
      this.users = [];
      await axios.get('users')
        .then(res => this.users = res.data)
        .catch(err => console.log(err))
    },
    handleSubmit() {
      if(this.users.length)
        this.handleLogin();
      else
        this.handleCreate();
    },
    async handleLogin() {
      const response = await axios.post('users/login', {
        username: this.username,
        password: this.password,
      });

      if(response.data !== 'User not Found' &&
        response.data !== 'Not allowed') {
        localStorage.setItem('token', response.data.token);
  
        this.$router.push('/'); 
      } else {
        this.errorMessage = 'Usuário ou senha inválidos';
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
          this.errorMessage = '';
        }, 3000);
      }

    },
    async handleCreate() {
      await axios.post('users', {
        username: this.username,
        password: this.password,
      })

      window.location.reload();
    }
  },
}
</script>

<style scoped>
  #geral {
    height: 75vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
  }
  
  .card {
    background: #CC5036;
    padding: 10px 30px;
    width: 350px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0px auto;
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