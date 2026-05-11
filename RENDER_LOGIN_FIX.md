# Render Login Fix - "Server returned HTML instead of JSON"

## ✅ FIXES APPLIED TO FRONTEND

### 1. Updated API Client (`src/api/client.js`)
- ✅ Added `mode: 'cors'` to fetch requests
- ✅ Added `credentials: 'include'` for cookie handling
- ✅ Added detection for HTML responses with better error messages
- ✅ Added network error handling with helpful diagnostics

### 2. Updated AuthController (`src/AuthController.jsx`)
- ✅ Added `mode: 'cors'` to login fetch request
- ✅ Added `mode: 'cors'` to OTP verification
- ✅ Added `mode: 'cors'` to registration fetch
- ✅ Added `mode: 'cors'` to password reset endpoints

### 3. Current Environment Configuration (`.env`)
```
VITE_API_BASE_URL=https://lbca-monitoring-system-backend.onrender.com
VITE_USE_MOCK_FALLBACK=false
```

---

## 🔍 DEBUGGING STEPS

### Step 1: Check Browser Console for Detailed Error
1. Open your Render app in browser
2. Press `F12` to open DevTools
3. Go to **Console** tab
4. Try to login
5. **Look for error messages** - they should now be more detailed thanks to our fixes
6. Check **Network** tab to see:
   - Which endpoint is being called
   - What status code is returned
   - What the response looks like

### Step 2: Verify Backend is Running
Test your backend directly:
```bash
curl -X POST https://lbca-monitoring-system-backend.onrender.com/api/teacher/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin_user","password":"your_password"}'
```

**Expected response (JSON):**
```json
{
  "token": "abc123xyz...",
  "message": "Login successful",
  "role": "Admin"
}
```

**Wrong response (HTML):**
```html
<!DOCTYPE html>
<html>...
</html>
```
↑ If you see this, your backend is down or misconfigured.

---

## 🔧 BACKEND CONFIGURATION CHECKLIST

Your Django backend on Render **MUST** have:

### 1. CORS Configuration
```python
# settings.py

# Install: pip install django-cors-headers
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be first
    'django.middleware.common.CommonMiddleware',
    ...
]

# Allow your Render frontend domain
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend-render-app.onrender.com",
    "http://localhost:3000",  # For local testing
    "http://localhost:5173",  # For Vite dev
]

# Or allow all (NOT RECOMMENDED for production):
CORS_ALLOW_ALL_ORIGINS = True
```

### 2. Django Settings Verification
```python
# settings.py
DEBUG = False  # In production
SECRET_KEY = os.environ.get('SECRET_KEY')
ALLOWED_HOSTS = ['lbca-monitoring-system-backend.onrender.com', 'localhost']

# Database (Render expects DATABASE_URL env var)
import dj_database_url
DATABASES = {
    'default': dj_database_url.config()
}
```

### 3. Render Backend Service Environment Variables
Your Render backend service should have:
- ✅ `DATABASE_URL` → PostgreSQL connection string
- ✅ `SECRET_KEY` → Django secret key
- ✅ `DEBUG` → `False`
- ✅ `ALLOWED_HOSTS` → Your Render domain
- ✅ Any other custom env vars your backend needs

---

## 🚀 DEPLOYMENT CHECKLIST

### Frontend (Render)
- [ ] Build command: `npm ci && npm run build`
- [ ] Publish directory: `dist`
- [ ] Environment variables:
  - `VITE_API_BASE_URL=https://lbca-monitoring-system-backend.onrender.com`
  - `VITE_USE_MOCK_FALLBACK=false`

### Backend (Render)
- [ ] CORS headers installed: `pip install django-cors-headers`
- [ ] CORS middleware configured
- [ ] Database URL environment variable set
- [ ] Static files configured (if needed): `python manage.py collectstatic`
- [ ] Migrations run: `python manage.py migrate`

---

## 📋 COMMON ISSUES & SOLUTIONS

### Issue: "Server returned HTML instead of JSON"

**Cause 1: Backend not running**
- Solution: Check Render dashboard logs, restart service

**Cause 2: CORS not configured**
- Solution: Install django-cors-headers, add CORS_ALLOWED_ORIGINS

**Cause 3: Wrong endpoint path**
- Solution: Verify backend has `/api/teacher/login/` endpoint

**Cause 4: Backend throwing 500 error**
- Solution: Check Render logs for exception
  ```bash
  # In Render dashboard:
  # Services > your-backend > Logs
  ```

### Issue: "Cannot reach API server"

**Cause: Network/DNS issue**
- Solution:
  1. Verify VITE_API_BASE_URL is correct in .env
  2. Test manually: `curl https://lbca-monitoring-system-backend.onrender.com/api/teacher/login/`
  3. Check if Render backend service is still running

### Issue: CORS error (even with our fixes)

**Check backend logs for CORS error**, then:
1. Verify frontend domain is in `CORS_ALLOWED_ORIGINS`
2. Ensure middleware order is correct (CorsMiddleware must be first)
3. Restart backend service after changing settings

---

## 🧪 LOCAL TESTING

To test locally before deploying again:

1. **Backend (Django)**
   ```bash
   python manage.py runserver 8000
   ```

2. **Frontend (Vite)**
   ```bash
   # Update .env to:
   VITE_API_BASE_URL=http://127.0.0.1:8000
   
   npm run dev
   ```

3. **Test login** - should work at http://localhost:5173

---

## 📞 NEXT STEPS

1. **Check Render backend logs** in your Render dashboard
2. **Verify CORS is configured** on your Django backend
3. **Test the backend endpoint directly** with curl (see step 2 above)
4. **Rebuild and redeploy** your frontend after verifying backend is working

If you still see errors after these steps, share:
- Browser console error message
- Curl response from backend endpoint
- Render backend logs
