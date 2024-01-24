import api from './intercepteur';

export const deleteUser = async (id : number) => {
    try {
        await api.delete(`/users/${id}`);
    } catch (e) {
        throw e
    }
}