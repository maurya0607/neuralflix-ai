/**
 * Centralized API Configuration
 * 
 * In development, it uses the current window hostname (for mobile testing).
 * In production, you can set VITE_API_URL in your deployment environment.
 */

const BASE_HOST = window.location.hostname;
const DEV_API_URL = `http://${BASE_HOST}:5000/api`;

// Use environment variable if available, otherwise fallback to dynamic dev URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || DEV_API_URL;
