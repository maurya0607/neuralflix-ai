import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/story`;


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
    const errorData = await response.json().catch(()=>({}));
    throw new Error(errorData.error || 'Request Failed');
  }
  return response.json();
};

export const storyService = {
  saveStory: async (name, dream, struggles, script) => {
    return fetchAPI('/', {
      method: 'POST',
      body: JSON.stringify({ name, dream, struggles, script })
    });
  },

  getMyStories: async () => {
    return fetchAPI('/', {
      method: 'GET'
    });
  },

  deleteStory: async (id) => {
    return fetchAPI(`/${id}`, {
      method: 'DELETE'
    });
  }
};
