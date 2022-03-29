import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3031/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');