import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/api';
import { Card, CardContent, Typography, Grid, Avatar } from '@mui/material';

const UserList = ({ users }) => {
  return (
    <div>
      <Typography variant='h6' gutterBottom>
        Recent Added Employees
      </Typography>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <Card
              sx={{ textAlign: 'center', p: 2, borderRadius: 2, boxShadow: 2 }}
            >
              <CardContent>
                <Avatar sx={{ mx: 'auto', mb: 1 }} />
                <Typography variant='subtitle1'>{user.name}</Typography>
                <Typography variant='body2' color='textSecondary'>
                  {user.role}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {user.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserList;
