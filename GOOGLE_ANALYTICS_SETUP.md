# Google Analytics Setup Guide

## Step 1: Get Your Google Analytics Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. If you don't have a property yet:
   - Click "Admin" (gear icon in bottom left)
   - Click "Create Property"
   - Fill in your website details
   - Click "Create"

4. Get your Measurement ID:
   - Go to **Admin** → **Data Streams**
   - Click on your web stream (or create one if you haven't)
   - Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

## Step 2: Add Measurement ID to Your Project

1. Open the `.env.local` file in the root of your project
2. Replace `YOUR_GA_MEASUREMENT_ID_HERE` with your actual Measurement ID:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

3. Save the file

## Step 3: Restart Your Development Server

```bash
npm run dev
```

## Step 4: Verify Installation

1. Open your website in a browser
2. Open browser DevTools (F12)
3. Go to the **Network** tab
4. Look for requests to `google-analytics.com` or `googletagmanager.com`
5. Or use the [Google Analytics Debugger Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)

## What Gets Tracked

The Google Analytics integration automatically tracks:
- **Page views** - Every page visit
- **User sessions** - How long users stay
- **Traffic sources** - Where users come from
- **Device types** - Desktop, mobile, tablet
- **Geographic location** - Country, city
- **User behavior** - Navigation patterns

## Privacy & GDPR Compliance

If you need to comply with GDPR or other privacy regulations, you may need to:
1. Add a cookie consent banner
2. Only load Google Analytics after user consent
3. Add a privacy policy page

## Troubleshooting

### Analytics not showing data?
- Wait 24-48 hours for data to appear
- Check that your Measurement ID is correct
- Verify the `.env.local` file is not committed to git
- Make sure you restarted the dev server after adding the ID

### Still not working?
- Check browser console for errors
- Verify the Google Analytics scripts are loading in the Network tab
- Make sure ad blockers are disabled for testing
- Check that your website is publicly accessible (not localhost for production)

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):
1. Add the environment variable in your hosting platform's dashboard
2. Variable name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
3. Value: Your Measurement ID (G-XXXXXXXXXX)
4. Redeploy your application

### Vercel
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` with your Measurement ID
4. Redeploy

### Netlify
1. Go to Site settings → Build & deploy → Environment
2. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` with your Measurement ID
3. Redeploy

## Files Added

- `/components/GoogleAnalytics.tsx` - Google Analytics component
- `/app/layout.tsx` - Updated to include Google Analytics
- `/.env.local` - Environment variables (not committed to git)
- `/.env.example` - Example environment file (safe to commit)
- `/GOOGLE_ANALYTICS_SETUP.md` - This guide
