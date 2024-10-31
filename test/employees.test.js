const request = require('supertest');
const express = require('express');
const employeesRoutes = require('../config/routes.config');

const app = express();
app.use(express.json());
app.use('/api/employees', employeesRoutes);

describe('GET /api/employees', () => {
    it('should return all employees', async () => {
        const res = await request(app).get('/api/employees');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
});