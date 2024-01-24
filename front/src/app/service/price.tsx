import api from "./intercepteur";

export const price = async () => {
    try {
        //window location API next
        const response = await api.get('http://localhost:8000/shoppings/price');
        return response.data;
    } catch(e){
        throw e
    }
}

