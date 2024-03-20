import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3000',
    LOGIN_URL:'localhost:3000/api/users',
    AUTH_URL:'localhost:3000/api/auth'
});