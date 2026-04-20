
import { API_BASE_URL } from '../config';

const API_BASE = API_BASE_URL;


export const generateProfessionalStory = async (formData) => {
  try {
    const response = await fetch(`${API_BASE}/ai/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to generate script");
    return data.script;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};

export const chatWithScript = async (script, messages) => {
  try {
    const response = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ script, messages }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Chat failed");
    return data.reply;
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
};