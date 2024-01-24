import api from "./intercepteur";

export const shoppingCart = async () => {
    try {
        //window location API next
        const response = await api.get('http://localhost:8000/shoppings/cart');
        return response.data;
    } catch(e){
        throw e
    }
}

