# Inventory Management System - Local Setup & Deployment Guide

## 🚀 GitHub Repository
Repository: https://github.com/rizlopes2005-create/inventory-managment

Already pushed ✅

## 📋 Prerequisites
- Node.js 18.x or higher
- PostgreSQL (for local development)
- npm or yarn

## 🏠 Running Locally

### Backend Setup
```bash
cd server
npm install
npm run dev
```
Server will run on: http://localhost:5000

### Frontend Setup
```bash
cd client
npm install
npm run dev
```
Client will run on: http://localhost:5173

### Database Setup
1. Make sure PostgreSQL is running
2. Create database:
```sql
CREATE DATABASE inventory_management;
```

3. Run schema and seed:
```bash
psql -U postgres -d inventory_management -f server/db/schema.sql
psql -U postgres -d inventory_management -f server/db/seed.sql
```

4. Update `.env` file in server folder with your PostgreSQL credentials:
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=inventory_management
```

## 🌐 Render Deployment

### Step-by-Step Deployment Guide:

1. **Go to https://render.com and sign up**

2. **Create a new PostgreSQL Database:**
   - Click "New +" → "PostgreSQL"
   - Name: `inventory-db`
   - Region: Choose closest to you
   - Note the database credentials

3. **Create a new Web Service:**
   - Click "New +" → "Web Service"
   - Connect to your GitHub repo: `inventory-managment`
   - Configuration:
     - **Name:** `inventory-backend`
     - **Branch:** `main`
     - **Build Command:** `cd server && npm install`
     - **Start Command:** `cd server && npm start`
     - **Environment:** Node
     - **Plan:** Free tier

4. **Add Environment Variables in Render:**
   Go to Settings → Environment
   ```
   NODE_ENV=production
   PORT=10000
   DB_USER=<from database credentials>
   DB_PASSWORD=<from database credentials>
   DB_HOST=<from database credentials>
   DB_PORT=5432
   DB_NAME=inventory_management
   JWT_SECRET=<generate a secure random string>
   EMAIL_USER=<your email>
   EMAIL_PASSWORD=<app password>
   EMAIL_SERVICE=gmail
   CLIENT_URL=<your frontend URL on Vercel>
   ```

5. **Deploy Frontend on Vercel:**
   - Go to https://vercel.com
   - Import GitHub project: `inventory-managment`
   - Select `client` as root directory
   - Add environment variable for backend API URL
   - Deploy

6. **Connect Backend & Frontend:**
   - Update `CLIENT_URL` in Render environment to your Vercel frontend URL
   - Update API endpoints in frontend to point to Render backend

## 📦 Environment Variables

For **local development**, create `server/.env`:
```
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=inventory_management
PORT=5000
NODE_ENV=development
JWT_SECRET=local_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_SERVICE=gmail
CLIENT_URL=http://localhost:5173
```

For **production on Render**, set variables in Render dashboard.

## ✨ API Endpoints (Backend)
- `GET /api/health` - Server health check
- `GET /api/test` - Test endpoint

## 🔑 Key Features
✅ Military Food Inventory Management
✅ Three User Roles: Admin, Store Officer, Vendor
✅ Role-Based Access Control (JWT)
✅ PostgreSQL Database
✅ Email Notifications
✅ QR Code Support
✅ Dark Military Theme UI

## 🐛 Troubleshooting

### Port Already in Use
- Backend: Change PORT in `.env` (default: 5000)
- Frontend: Change port in vite.config.js

### Database Connection Failed
- Ensure PostgreSQL service is running
- Check DB credentials in `.env`
- Verify database exists: `psql -U postgres -l`

### CORS Issues
- Update `CLIENT_URL` in backend `.env`
- Ensure CORS middleware allows your frontend URL

### Build Fails on Render
- Check that `render.yaml` is in root directory
- Verify all dependencies are in `package.json`
- Check build logs in Render dashboard

## 📱 Deployed URLs (After Setup)
- **Frontend:** https://inventory-managment.vercel.app (example)
- **Backend:** https://inventory-backend.onrender.com (example)
- **Local:** http://localhost:5173 (frontend) + http://localhost:5000 (backend)

## 🔐 Security Notes
- Never commit `.env` with real credentials
- Use environment variables for sensitive data
- JWT secret must be strong and unique per environment
- Update CORS settings for production

## 📞 Next Steps
1. Set up PostgreSQL locally
2. Install dependencies in both folders
3. Run application locally to test
4. Deploy to Render and Vercel
5. Update API endpoints in frontend for production URLs
