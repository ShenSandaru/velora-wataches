const API_BASE_URL = 'http://localhost:5000/api';

export const authAPI = {
  async login(email, password) {
    console.log('Login request for:', email);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login error:', errorData);
        throw new Error(errorData.msg || 'Login failed');
      }
      
      const data = await response.json();
      console.log('Login successful, received token');
      return data;
    } catch (error) {
      console.error('Login fetch error:', error);
      throw error;
    }
  },
  
  async signup(userData) {
    console.log('Signup request for:', userData.email);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Signup error:', errorData);
        throw new Error(errorData.msg || 'Signup failed');
      }
      
      const data = await response.json();
      console.log('Signup successful, received token');
      return data;
    } catch (error) {
      console.error('Signup fetch error:', error);
      throw error;
    }
  }
};

export const userAPI = {
  async changePassword(currentPassword, newPassword) {
    console.log('Password change request initiated');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found');
        throw new Error('Authentication required');
      }
      console.log('Token found in localStorage');
      
      const response = await fetch(`${API_BASE_URL}/user/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Password change error:', errorData);
        throw new Error(errorData.msg || 'Password change failed');
      }
      
      const data = await response.json();
      console.log('Password change successful');
      return data;
    } catch (error) {
      console.error('Password change fetch error:', error);
      throw error;
    }
  },
};