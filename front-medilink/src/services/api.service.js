import axiosInstance from './axios.config';

export const apiService = {
    // Ejemplo de método GET
    async getData() {
        try {
            const response = await axiosInstance.get('/');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Ejemplo de método POST
    async postData(data) {
        try {
            const response = await axiosInstance.post('/ruta', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 