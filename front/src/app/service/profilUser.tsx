import api from "./intercepteur"

export const getUser = async (id: number) => {
    try {
      const response = await api.get(`users/${id}`);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error; // Vous pourriez vouloir gérer l'erreur différemment
    }
  };