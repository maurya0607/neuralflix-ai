// const API_URL = 'http://localhost:5000/api/story';
const BASE_HOST = window.location.hostname;
const API_URL = `http://${BASE_HOST}:5000/api/story`;

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
