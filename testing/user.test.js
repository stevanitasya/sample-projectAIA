const mongoose = require('mongoose');
const test = require('supertest');
const app = require('../server.js');
require('dotenv').config();

let apps;
beforeEach(async () => {
    apps = await app();
    await mongoose.connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterEach(async () => {
    await mongoose.connection.close();
});


describe('User', () => {
    it('user should login', async () => {
        const response = await test(apps)
            .post('/api/v1/user/login')
            .send({
                Fullname: 'coba dulu kali',
                email: 'cobadulukali@email.com',
                password: '123456',
                phone: '081272789900',
            });
        expect(response.status).toBe(200);
    });
});