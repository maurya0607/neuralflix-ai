// export const generateProfessionalStory = async (formData) => {
//   try {
//     const response = await fetch('http://localhost:5000/api/ai/generate', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.error || "Failed to generate script via backend");
//     }

//     return data.script;
//   } catch (error) {
//     console.error("AI Service Error:", error);
//     throw error;
//   }
// };

const BASE_HOST = window.location.hostname;
const API_BASE = `http://${BASE_HOST}:5000/api`;

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