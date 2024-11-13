import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiCsv = axios.create({
  baseURL: '/api',
  headers: {
    'Accept': 'text/csv',
    'Content-Type': 'text/csv',
    "Content-Disposition": "attachment;filename=expenses.csv",
  },
});

export const getAllUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
};

export const getExpensesByUserId = async (userId) => {
  const response = await api.get(`/expenses/${userId}`);
  return response.data;
};

export const getGroups = async () => {
  try {
    const response = await api.get(`/groups`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
};

// Fetch all users and count employees and managers
export const fetchUserCounts = async () => {
  try {
    const response = await api.get("/users");
    const users = response.data;

    const employeesCount = users.filter(
      (user) => user.role === "employee"
    ).length;
    const managersCount = users.filter(
      (user) => user.role === "manager"
    ).length;

    return { employeesCount, managersCount };
  } catch (error) {
    console.error("Error fetching user counts:", error);
    return { employeesCount: 0, managersCount: 0 };
  }
};

export const addUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user", error);
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
    console.error("Error fetching group count:", error);
    return 0;
  }
};
export const addGroup = async (groupData) => {
  try {
    const response = await api.post("/groups", groupData);
    return response.data;
  } catch (error) {
    console.error("Error creating group", error);
    throw error;
  }
};

// For submitting an expense request
export const requestExpense = async (expenseData) => {
  try {
    const response = await api.post("/expenses", expenseData);
    return response.data;
  } catch (error) {
    console.error("Error requesting expense:", error);
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

export const handleDownloadCsv = () => {
  const tempLink = document.createElement('a')
  tempLink.href = 'http://localhost:3000/api/manager/requests/recentCsv'
  tempLink.click()
}

export const approveRequest = async (id) => {
  try {
    const response = await api.put('/expenses/' + id,
        { status: 'approved', updatedAt: new Date()}
    );
    return response.data;
  } catch (error) {
    console.error('Error creating group', error);
    throw error;
  }
};

export const declineRequest = async (id) => {
  try {
    const response = await api.put('/expenses/' + id,
        { status: 'declined', updatedAt: new Date()}
    );
    return response.data;
  } catch (error) {
    console.error('Error creating group', error);
    throw error;
  }
};

export const fetchEmployees = async () => {
  try {
    const response = await api.get('/manager');
    return response.data;
  } catch (error) {
    console.error('Error creating group', error);
    throw error;
  }
}
