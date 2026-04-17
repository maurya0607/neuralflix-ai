/**
 * Centralized API Configuration
 * 
 * In development, it uses the current window hostname (for mobile testing).
 * In production, you MUST set VITE_API_URL in your deployment environment variables.
 */

const BASE_HOST = window.location.hostname;
const PROTOCOL = window.location.protocol; // http: or https:
const DEV_API_URL = `${PROTOCOL}//${BASE_HOST}:5000/api`;

// Use environment variable if available, otherwise fallback to dynamic dev URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || DEV_API_URL;

console.log(`[Config] API Base URL: ${API_BASE_URL}`);

if (!import.meta.env.VITE_API_URL && window.location.hostname !== 'localhost' && !window.location.hostname.includes('192.168.')) {
    console.warn('[Config] Running in production but VITE_API_URL is NOT set. It might default to a broken URL.');
}
