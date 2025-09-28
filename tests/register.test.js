const axios = require('axios');

const { API_URL } = require('../config.js'); 
const mode_register = 'register/';
const mode_login = 'login/';

const userData = {
            login: 'superpower15@super.aa',
            password: 'canone'
        };
const userDataFake = {
            login: 'loh@loch'
        };
        

describe('Тест для POST - регистрация', () => {
    test('POST - register - пустой пароь => ошибка', async () => {
        
    try {
        await axios.post(`${API_URL}${mode_register}`, userDataFake);
    } catch (error) {
        
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty('message');
        expect(error.response.data.message).toBe('Required fields missed');
    }
  });

    test('POST - register - успешная регистрация с верными данными', async () => {
        

        const response = await axios.post(`${API_URL}${mode_register}`, userData);
        expect(response.status).toBe(200);        
        expect(response.data).toHaveProperty('message');
        expect(response.data.token).not.toBe('');    
    });
});

describe('Тест для POST - логин', () => {
    test('POST - login - нормальный логин этогошнего пользователя', async () => {
        
        const response = await axios.post(`${API_URL}${mode_login}`, userData);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('token');
        expect(response.data.token).not.toBe('');
        expect(response.data).toHaveProperty('expires_in');
        expect(response.data.expires_in).toBe(86400);
    
    });
    
    test('POST - login - фейковый логин, к тому же без пароля', async () => {
        
        try {
            await axios.post(`${API_URL}${mode_login}`, userDataFake);
        } catch (error) {
            
            expect(error.response.status).toBe(401);
            expect(error.response.data).toHaveProperty('message');
            expect(error.response.data.message).toBe('Incorrect login or password');
        }
    });
});