const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('../routes/userRouter');
const { connectToDatabase, disconnectFromDatabase } = require('../db/index');

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRouter);

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await disconnectFromDatabase();
});

describe('User Service', () => {
  it('naredi novega userja', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        password: 'password123',
        email: 'testuser@example.com'
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('vrne userja na podlagi id', async () => {
    const userId = 'someUserId';
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
  });

  it('posodobi userja', async () => {
    const userId = 'someUserId';
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send({
        username: 'updateduser',
        email: 'updateduser@example.com'
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'updateduser');
  });

  it('izbrise userja', async () => {
    const userId = 'someUserId';
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.status).toBe(204);
  });
});