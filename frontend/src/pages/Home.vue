<template>
  <div id="geral">
    <h1>Cantina Santa Mistura</h1>
    <h4>Bem vind@, Renata ou Gilberto!</h4>
    <div class="container-opcoes">
      <router-link to="/pedidos" class="option">Pedido</router-link>
      <router-link to="/pedidos-do-dia" class="option">Pedidos do Dia</router-link>
      <router-link to="/clientes" class="option">Clientes</router-link>
      <router-link to="/produtos" class="option">Produtos</router-link>
      <router-link to="/turmas" class="option special">Turmas</router-link>
      <router-view  />
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
  #geral {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h1 {
    margin: 10px;
  }

  h4 {
    margin: 10px;
    font-size: 1.2rem;
  }
  .container-opcoes {
    display: grid;
    margin: 4rem auto;
    max-width: 700px;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .container-opcoes .option {
    text-decoration: none;
    background-color: #CC5036;
    border: none;
    border-radius: 4px;
    width: 250px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    font-size: 20px;
  }

  .container-opcoes .special {
    grid-column: 1 / 3;
  }
</style>