// Use Render backend URL in production, localhost in development
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';