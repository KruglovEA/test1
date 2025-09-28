const axios = require('axios');
const { API_URL } = require('../config.js'); 
const mode = 'products/'

describe('GET - products возвращает статус, массив продуктов, а именно определенные значение', () => {

    test('GET - products возвращает статус 200', async () => {
        try {
            const response = await axios.get(`${API_URL}${mode}`);
            expect(response.status).toBe(200);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('GET - products возвращает массив продуктов', async () => {
        try {
            const response = await axios.get(`${API_URL}${mode}`);
            
            expect(Array.isArray(response.data)).toBe(true);
        } catch (error) {
            throw new Error(error);
        }
    });
    test('GET - products возвращает определенные значение', async () => {
        try {
            const response = await axios.get(`${API_URL}products/`);
            let firstTestProduct = response.data[0];
            expect(firstTestProduct).toHaveProperty('id');
            expect(firstTestProduct).toHaveProperty('name'); 
            expect(firstTestProduct).toHaveProperty('price');
        
        } catch (error) {
            throw new Error(error);
        }
    });

});