/**
 * Centralized API Configuration
 *
 * Production (Vercel):  Set VITE_API_URL = https://vishva-noraai.onrender.com/api
 *                       in Vercel → Settings → Environment Variables
 *
 * Development (local):  Falls back to http://localhost:5000/api automatically.
 */

const DEV_API_URL = `http://${window.location.hostname}:5000/api`;

// VITE_API_URL must be set in Vercel env vars — it should end with /api
export const API_BASE_URL = import.meta.env.VITE_API_URL || DEV_API_URL;

console.log(`[Config] API Base URL: ${API_BASE_URL}`);

if (!import.meta.env.VITE_API_URL && window.location.hostname !== 'localhost') {
  console.warn('[Config] ⚠️ VITE_API_URL is NOT set. API calls may fail in production.');
}
