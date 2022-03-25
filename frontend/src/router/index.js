import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Turmas from '../pages/Turmas.vue';
import Clientes from '../pages/Clientes.vue';
import Produtos from '../pages/Produtos.vue';
import Pedidos from '../pages/Pedidos.vue';
import PedidosDoDia from '../pages/PedidosDoDia.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/turmas',
    name: 'Turmas',
    component: Turmas
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: Clientes
  },
  {
    path: '/produtos',
    name: 'Produtos',
    component: Produtos
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: Pedidos
  },
  {
    path: '/pedidos-do-dia',
    name: 'Pedidos do Dia',
    component: PedidosDoDia
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;