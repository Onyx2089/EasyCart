import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


const api = axios.create({
  baseURL: 'http://localhost:8000/', 
});

api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(response => {
    return response;
}, error => {
    if(error.response && error.response.status ===403 ){
        toast.error("Vous n'avez pas les droits");
    }
    if(error.response && error.response.status ===401 ){
        toast.error("Veuillez vous connecter.");
    }
})

export default api;