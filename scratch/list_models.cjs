const { GoogleGenAI } = require('@google/genai');
require('dotenv').config({ path: './backend/.env' });

async function listModels() {
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const models = await genAI.models.listModels();
    console.log(JSON.stringify(models, null, 2));
  } catch (err) {
    console.error("Failed to list models:", err.message);
  }
}

listModels();
