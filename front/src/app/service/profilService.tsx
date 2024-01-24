import api from "./intercepteur";

export const profilUser = async () => {
    try {
        //window location API next
        const response = await api.get('http://localhost:8000/users');
        return response.data;
    } catch(e){
        throw e
    }
}

