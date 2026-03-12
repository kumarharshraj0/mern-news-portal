# 🚀 ZIVEK - Deployment Guide

This document provides instructions for deploying the ZIVEK MERN News Portal to production.

## 📋 Prerequisites
- A MongoDB Atlas account (for the database).
- A Cloudinary account (for image hosting).
- (Optional) A Razorpay account (for subscriptions).

## 🛠️ Step 1: Environment Variables
Create a production `.env` file on your hosting platform with the following keys:
```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secure_random_secret
PORT=5000
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_ORIGIN=your_frontend_url
ADMIN_DASHBOARD_ORIGIN=your_admin_url
```

## 🌐 Step 2: Backend Deployment (e.g., Render, Heroku)
1. **Repository**: Push your code to GitHub.
2. **Setup**: Create a new Web Service.
3. **Build Command**: `npm install --prefix backend`
4. **Start Command**: `npm start --prefix backend`
5. **Environment**: Add all variables from Step 1.

## 🎨 Step 3: Frontend Deployment (e.g., Netlify, Vercel)
1. **Repository**: Connect your GitHub repository.
2. **Build Settings**:
   - **Build Command**: `npm run build` (runs `vite build` in `frontend`)
   - **Publish Directory**: `frontend/dist`
3. **SPA Routing**: The `frontend/public/_redirects` file is already included to handle routing.

## 🛡️ Important Notes
- **CORS**: Ensure `CLIENT_ORIGIN` matches your public frontend URL exactly.
- **Relative APIs**: The frontend uses `/api` for communication. Ensure your hosting platform handles this or update `axiosInstance.jsx` to use a hardcoded production URL if necessary.
