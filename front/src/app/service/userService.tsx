
import api from './intercepteur';

const createUser = async (username : string, first_name: string, last_name: string,email: string, password: string) => {
    try {
        const response = await api.post('http://localhost:8000/users/', {
            username,
            first_name,
            last_name,
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { createUser };