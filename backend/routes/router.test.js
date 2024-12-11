const request = require('supertest');
const express = require('express');
const router = require('./groupRouter');
const router2 = require('./userRouter');
const GroupService = require('../services/GroupService');
const UserService = require("../services/UserService");

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