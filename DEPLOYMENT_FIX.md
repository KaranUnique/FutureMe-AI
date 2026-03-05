# Deployment Fix Guide

## Issues Fixed:
1. ✅ Removed hardcoded localhost:5000 URLs in frontend
2. ✅ Added environment variable support for API URLs
3. ✅ Updated CORS configuration for production security
4. ✅ Removed conflicting Three.js dependencies

## Required Actions for Deployment:

### 1. Backend Deployment (Render/Heroku/etc.)
- Deploy your backend first
- Note the deployed backend URL (e.g., `https://your-app.onrender.com`)
- Set environment variables:
  - `NODE_ENV=production`
  - `GEMINI_API_KEY=your_gemini_api_key`
  - Update CORS allowed origins in server.js with your frontend URL

### 2. Frontend Deployment (Vercel/Netlify/etc.)
- Set environment variable: `VITE_API_URL=https://your-backend-url.onrender.com/api`
- The frontend will automatically use this URL in production

### 3. Environment Files Created:
- `.env.example` - Template for environment variables
- `.env.development` - Local development (localhost:5000)

### 4. CORS Configuration:
- Development: Allows all origins
- Production: Restricts to specific domains (update server.js line 21-22)

## Testing:
1. Locally: Ensure backend runs on port 5000 and frontend can connect
2. Production: Frontend should connect to deployed backend URL

## Files Modified:
- `frontend/src/components/ActionPlan.jsx` - Fixed hardcoded URL
- `backend/server.js` - Improved CORS configuration
- `frontend/.env.example` - Environment variables template
- `frontend/.env.development` - Development environment
- `frontend/package.json` - Removed conflicting dependencies
