/**
 * Frontend-Only Version README
 * 
 * This is a frontend-only demo version of the Cemetery Management System.
 * It runs entirely in the browser with mock data and no backend required.
 */

# Cemetery Management System - Frontend Version

## 🚀 Quick Start

### Login Credentials
```
Username: admin
Password: admin123
```

### Running Locally
```bash
npm install
npm run dev
```

The app will start on `http://localhost:5173`

## ⚠️ Important Notes

### This is a Frontend-Only Demo Version
- **No database connection** - Uses mock data instead
- **Limited functionality** - Features that require backend processing won't work
- **For demo/showcase purposes only** - Not suitable for production

### What Works
✅ Login/Logout with fixed credentials
✅ Dashboard navigation and UI
✅ Map viewing with sample data
✅ Profile page
✅ Activity logs (mock data)
✅ All UI interactions and page navigation

### What Doesn't Work
❌ Creating, editing, or deleting records
❌ Payment processing
❌ Customer management (backend operations)
❌ File imports/exports (requires server)
❌ Email notifications
❌ Real data persistence
❌ Advanced search/filtering with live data

## 📦 Deployment to Vercel

### Step-by-Step

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Frontend-only demo version"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Select "Other" as framework (Vite is automatic)

3. **Configure Build Settings**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Node.js Version**: 18.x (recommended)

4. **Deploy**
   - Click Deploy
   - Your app will be live at `https://your-project.vercel.app`

## 🔧 Customization

### Change Login Credentials
Edit [src/utils/mockAuth.js](src/utils/mockAuth.js)

### Change Mock Data
Edit [src/utils/mockData.js](src/utils/mockData.js)

### Update API Endpoints
Edit [src/utils/mockApiInterceptor.js](src/utils/mockApiInterceptor.js)

## 📝 File Structure

```
src/
├── components/
│   └── FrontendOnlyBanner.jsx      # Demo notice banner
├── configs/
│   └── api.js                       # API endpoint configuration
├── context/
│   └── AuthContext.jsx              # Mock authentication
├── utils/
│   ├── mockAuth.js                  # Login logic
│   ├── mockData.js                  # Sample data
│   └── mockApiInterceptor.js        # API interceptor
└── ...
```

## 🎯 Future Improvements

To convert back to a full-featured app:
1. Replace mock authentication with real backend login
2. Implement actual API calls in `mockApiInterceptor.js`
3. Set up a backend server (PHP, Node.js, etc.)
4. Configure database connection
5. Deploy backend separately (Heroku, Railway, etc.)

## 📄 License

See LICENSE file for details.
