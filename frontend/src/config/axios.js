import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_QWORKOUTS_API
});

export default axiosClient;