import axios from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie'
export async function getAndStoreToken(username : string, password : string) {
    try {
        const data = qs.stringify({
            username,
            password
        });
        const config = {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }
        const response = await axios.post('http://localhost:8000/login', data, config);
        const token = response.data.access_token;
        Cookies.set('token', token);
        console.log('Token stocké avec succès');
    } catch (error) {
        console.log("Token non stocké" , error)
        throw error;
    }
}

