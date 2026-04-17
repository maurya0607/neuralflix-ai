// const express = require('express');
// const router = express.Router();
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // ── Updated model list (working as of 2025) ───────────────────────────────
// const MODEL_LIST = [
//   'gemini-2.0-flash',
//   'gemini-2.0-flash-lite',
//   'gemini-2.5-flash-preview-05-20',
//   'gemini-2.5-pro-preview-05-06',
// ];

// // ── Core retry helper ─────────────────────────────────────────────────────
// async function generateWithRetry(prompt) {
//   let lastError = null;

//   for (const modelName of MODEL_LIST) {
//     try {
//       console.log(`[AI] Attempting ${modelName}...`);
//       const model = genAI.getGenerativeModel({ model: modelName });
//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       const text = response.text();
//       console.log(`[AI] Success with ${modelName}`);
//       return text;
//     } catch (error) {
//       lastError = error;
//       const status = error?.status;
//       const msg = error?.message || '';
//       console.error(`[AI] Model ${modelName} failed | Status: ${status} | Error: ${msg}`);

//       // Always try next model
//       continue;
//     }
//   }

//   // All models exhausted → cinematic fallback
//   console.log('[AI] CRITICAL: All models failed. Using Neural Fallback.');
//   return `[NEURAL FALLBACK SCRIPT]
// [FADE IN]
// [INT. CINEMATIC VOID - FOREVER]
// NARRATOR: They said it couldn't be done. They said the limits were set in stone.
// [CUT TO: FLASHES OF ACTION]
// NARRATOR: But someone forgot to tell them... about the legacy being written today.
// [CLIMAX MUSIC RISES]
// NARRATOR: The dream is real. The struggle is valid.
// [FADE TO BLACK]
// NARRATOR: YOUR STORY. YOUR RULES.
// [SCENE END]`;
// }

// // ── POST /generate ────────────────────────────────────────────────────────
// router.post('/generate', async (req, res) => {
//   try {
//     const { name, dream, struggles, genre, mood } = req.body;

//     if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
//       return res.status(500).json({ error: 'Gemini API key is not configured.' });
//     }

//     if (!name || !dream || !struggles) {
//       return res.status(400).json({ error: 'name, dream, and struggles are required.' });
//     }

//     const prompt = `You are a cinematic movie trailer scriptwriter. Write a 100-word script for:
// Protagonist: ${name}
// Goal: ${dream}
// Conflict: ${struggles}
// Genre: ${genre || 'Drama'}
// Mood: ${mood || 'Inspirational'}

// Format the output with [VISUALS] scene directions and NARRATOR VO lines. Make it emotional and engaging.`;

//     const script = await generateWithRetry(prompt);
//     const isFallback = script.includes('NEURAL FALLBACK');

//     return res.json({
//       script,
//       info: isFallback ? 'Demo mode - all AI quotas exhausted.' : null,
//     });

//   } catch (error) {
//     console.error('Generate route error:', error);
//     return res.status(500).json({ error: error.message || 'Failed to generate AI script.' });
//   }
// });

// // ── POST /chat ────────────────────────────────────────────────────────────
// router.post('/chat', async (req, res) => {
//   try {
//     const { script, messages } = req.body;

//     if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
//       return res.status(500).json({ error: 'Gemini API key is not configured.' });
//     }

//     if (!messages || !Array.isArray(messages) || messages.length === 0) {
//       return res.status(400).json({ error: 'messages array is required.' });
//     }

//     const chatHistory = messages
//       .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
//       .join('\n');

//     const prompt = `You are a professional cinematic scriptwriter assistant.

// Below is a movie trailer script:

// --- SCRIPT START ---
// ${script || 'No script provided yet.'}
// --- SCRIPT END ---

// Discuss this script with the user. Improve it, give suggestions, or make changes as requested.

// Chat history:
// ${chatHistory}

// IMPORTANT: Always respond in ENGLISH only, regardless of what language the user writes in.

// Now respond as Assistant:`;

//     const reply = await generateWithRetry(prompt);

//     return res.json({ reply });

//   } catch (error) {
//     console.error('Chat route error:', error);
//     return res.status(500).json({ error: error.message || 'Chat failed.' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Model fallback list
const MODEL_LIST = [
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
  'mixtral-8x7b-32768',
  'gemma2-9b-it',
];

// Core AI helper with retry and fallback logic
async function generateWithRetry(systemPrompt, userPrompt) {
  let lastError = null;

  for (const modelName of MODEL_LIST) {
    try {
      console.log(`[AI] Attempting ${modelName}...`);

      const completion = await groq.chat.completions.create({
        model: modelName,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.85,
        max_tokens: 1024,
      });

      const text = completion.choices[0]?.message?.content;

      if (text) {
        console.log(`[AI] Success with ${modelName}`);
        return text;
      }
    } catch (error) {
      lastError = error;
      console.error(`[AI] Model ${modelName} failed | Error: ${error.message}`);
      continue;
    }
  }

  // All models failed - cinematic fallback
  console.log('[AI] CRITICAL: All models failed. Using Neural Fallback.');
  return `[NEURAL FALLBACK SCRIPT]
[FADE IN]
[INT. CINEMATIC VOID]
NARRATOR: They said it couldn't be done. They said the limits were set in stone.
[CUT TO: FLASHES OF ACTION]
NARRATOR: But someone forgot to tell them... about the legacy being written today.
[CLIMAX MUSIC RISES]
NARRATOR: The dream is real. The struggle is valid.
[FADE TO BLACK]
NARRATOR: VISHWANOVA AI. YOUR STORY. YOUR RULES.
[SCENE END]`;
}

// POST /generate
router.post('/generate', async (req, res) => {
  try {
    const { name, dream, struggles, genre, mood } = req.body;

    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY.length < 10) {
      return res.status(500).json({ error: 'Groq API key is missing or invalid in .env' });
    }

    if (!name || !dream || !struggles) {
      return res.status(400).json({ error: 'name, dream, and struggles are required.' });
    }

    const systemPrompt = `You are a world-class cinematic movie trailer scriptwriter. 
You write powerful, emotional, and epic trailer scripts with [VISUALS] scene directions and NARRATOR VO lines.
Keep it under 150 words. Make every word count.`;

    const userPrompt = `Write a cinematic movie trailer script for:
Protagonist: ${name}
Goal: ${dream}
Conflict: ${struggles}
Genre: ${genre || 'Drama'}
Mood: ${mood || 'Inspirational'}

Format with [VISUALS] and NARRATOR lines. Make it professional and epic.`;

    const script = await generateWithRetry(systemPrompt, userPrompt);
    const isFallback = script.includes('NEURAL FALLBACK');

    return res.json({
      script,
      info: isFallback ? 'Demo mode - AI unavailable.' : null,
    });

  } catch (error) {
    console.error('Generate route error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate AI script.' });
  }
});

// POST /chat
router.post('/chat', async (req, res) => {
  try {
    const { script, messages } = req.body;

    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY.length < 10) {
      return res.status(500).json({ error: 'Groq API key is missing or invalid in .env' });
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required.' });
    }

    const systemPrompt = `You are a professional cinematic scriptwriter assistant.
The user has a movie trailer script and wants to improve or modify it.
Always respond in English only. Be creative, helpful, and concise.`;

    const chatHistory = messages
      .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const userPrompt = `Current script:
--- SCRIPT START ---
${script || 'No script provided yet.'}
--- SCRIPT END ---

Conversation so far:
${chatHistory}

Now respond to the last user message above.`;

    const reply = await generateWithRetry(systemPrompt, userPrompt);

    return res.json({ reply });

  } catch (error) {
    console.error('Chat route error:', error);
    return res.status(500).json({ error: error.message || 'Chat failed.' });
  }
});

module.exports = router;