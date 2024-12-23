const request = require('supertest');
const express = require('express');
const router = require('./groupRouter');
const router2 = require('./userRouter');
const router3 = require('./managerRouter');
const GroupService = require('../../backend/services/GroupService.js');
const UserService = require("../../backend/services/UserService.js");
const jwt = require('jsonwebtoken');

jest.mock('../services/GroupService');
jest.mock('../services/UserService');

const app = express();
app.use(express.json());
app.use('/groups', router);

describe('GET /groups/expenses/csv', () => {
  it('should return CSV data with correct headers', async () => {
    const mockCsv = 'id,name,amount\n1,Group1,100\n2,Group2,200';
    GroupService.generateCsvForGroupExpenses.mockResolvedValue(mockCsv);

    const res = await request(app).get('/groups/expenses/csv');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('text/csv; charset=utf-8');
    expect(res.headers['content-disposition']).toBe('attachment; filename=expenses.csv');
    expect(res.text).toBe(mockCsv);
  });

  it('should return 500 if there is an error generating CSV', async () => {
    GroupService.generateCsvForGroupExpenses.mockRejectedValue(new Error('Failed to generate CSV'));

    const res = await request(app).get('/groups/expenses/csv');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Failed to generate CSV' });
  });


});
const app2 = express();
app2.use('/users', router2);
describe('GET /users/expenses/csv', () => {
it('should return CSV data with correct headers', async () => {
    const mockCsv = 'User,Amount,Description,Status,Group,Created At,Updated At';
    UserService.generateCsvForUserExpenses.mockResolvedValue(mockCsv);

    const res = await request(app2).get('/users/expenses/csv');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('text/csv; charset=utf-8');
    expect(res.headers['content-disposition']).toBe('attachment; filename=expenses.csv');
    expect(res.text).toBe(mockCsv);
});

it('should return 500 if there is an error generating CSV', async () => {
    UserService.generateCsvForUserExpenses.mockRejectedValue(new Error('Failed to generate CSV'));

    const res = await request(app2).get('/users/expenses/csv');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Failed to generate CSV' });
});
});

const app3 = express();
const bodyParser = require('body-parser');

// app3.use(bodyParser.json());
app3.use('/manager', router3);

describe('GET /managers/csv', () => {
    const JWT_SECRET = "Vkm123vkm$$$";
    const managerToken = jwt.sign({ userId: 'managerId', role: 'manager' }, JWT_SECRET, { expiresIn: '1h' });

    it('should return CSV data with correct headers', async () => {
        const mockCsv = 'id,name,role\n1,Manager1,manager\n2,Manager2,manager';
        UserService.generateCsvOfManagers.mockResolvedValue(mockCsv);

        const res = await request(app3)
            .get('/manager/managers/csv')
            .set('Authorization', `Bearer ${managerToken}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe('text/csv; charset=utf-8');
        expect(res.headers['content-disposition']).toBe('attachment; filename=managers.csv');
        expect(res.text).toBe(mockCsv);
    });

    it('should return 500 if there is an error generating CSV', async () => {
        UserService.generateCsvOfManagers.mockRejectedValue(new Error('Failed to generate CSV'));

        const res = await request(app3)
            .get('/manager/managers/csv')
            .set('Authorization', `Bearer ${managerToken}`);

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ message: 'Failed to generate CSV' });
    });

    it('should return 401 if no token is provided', async () => {
        const res = await request(app3)
            .get('/manager/managers/csv');

        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: 'Access token required' });
    });

    it('should return 403 if token is invalid', async () => {
        const res = await request(app3)
            .get('/manager/managers/csv')
            .set('Authorization', 'Bearer invalidToken');

        expect(res.status).toBe(403);
        expect(res.body).toEqual({ message: 'Invalid token' });
    });

    it('should return 403 if user is not a manager', async () => {
        const userToken = jwt.sign({ userId: 'userId', role: 'user' }, JWT_SECRET, { expiresIn: '1h' });

        const res = await request(app3)
            .get('/manager/managers/csv')
            .set('Authorization', `Bearer ${userToken}`);

        expect(res.status).toBe(403);
        expect(res.body).toEqual({ message: 'Only manager can access this resource' });
    });
});