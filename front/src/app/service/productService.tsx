import api from "./intercepteur";

export const productList = async () => {
    try {
        //window location API next
        const response = await api.get('http://localhost:8000/products');
        return response.data;
    } catch(e){
        throw e
    }
}

