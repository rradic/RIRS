import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users', error);
    throw error;
  }
};
// Fetch all users and count employees and managers
export const fetchUserCounts = async () => {
  try {
    const response = await api.get('/users');
    const users = response.data;

    const employeesCount = users.filter(
      (user) => user.role === 'employee'
    ).length;
    const managersCount = users.filter(
      (user) => user.role === 'manager'
    ).length;

    return { employeesCount, managersCount };
  } catch (error) {
    console.error('Error fetching user counts:', error);
    return { employeesCount: 0, managersCount: 0 };
  }
};

export const addUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user', error);
    throw error;
  }
};
// Fetch groups and count them
export const fetchGroupCount = async () => {
  try {
    const response = await api.get(`/groups`);
    const groups = response.data;
    const groupsCount = groups.length;

    return groupsCount;
  } catch (error) {
    console.error('Error fetching group count:', error);
    return 0;
  }
};
export const addGroup = async (groupData) => {
  try {
    const response = await api.post('/groups', groupData);
    return response.data;
  } catch (error) {
    console.error('Error creating group', error);
    throw error;
  }
};

export const fetchUsersRequests = async () => {
  try {
    const response = await api.get('/manager/requests/users');
    return response.data;
  } catch (error) {
    console.error('Error creating group', error);
    throw error;
  }
};

export const fetchGroupsRequests = async () => {
  try {
    const response = await api.get('/manager/requests/group');
    return response.data;
  } catch (error) {
    console.error('Error creating group', error);
    throw error;
  }
};

export const fetchRecentRequests = async () => {
  try {
    const response = await api.get('/manager/requests/recent');
    return response.data;
  } catch (error) {
    console.error('Error creating group', error);
    throw error;
  }
};

export const approveRequest = async () => {
  try {
    const response = await api.get('/manager/requests/group');
    return response.data;
  } catch (error) {
    console.error('Error creating group', error);
    throw error;
  }
};

export const declineRequest = async () => {
  try {
    const response = await api.get('/manager/requests/group');
    return response.data;
  } catch (error) {
    console.error('Error creating group', error);
    throw error;
  }
};
