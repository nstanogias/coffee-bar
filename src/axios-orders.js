import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-coffee-bar.firebaseio.com/'
});

export default instance;