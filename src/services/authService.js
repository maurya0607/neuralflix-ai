import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/auth`;


const fetchAPI = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'API Request Failed');
  }
  return response.json();
};

export const authService = {
  login: async (email, password) => {
    return fetchAPI('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  signup: async (name, email, password) => {
    return fetchAPI('/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
  },

  logout: async () => {
    return fetchAPI('/logout', {
      method: 'POST'
    });
  },

  getMe: async () => {
    return fetchAPI('/me', {
      method: 'GET'
    });
  }
};