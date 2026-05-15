# Google Calendar Integration Setup

This guide will help you connect your Google Calendar to the portfolio chatbot.

## Prerequisites

- Google account with calendar
- Google Cloud project access

## Step-by-Step Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project:
   - Click "Select a Project" → "NEW PROJECT"
   - Name: "Dicky Portfolio Calendar"
   - Click "Create"
3. Wait for the project to be created

### 2. Enable Google Calendar API

1. In the Cloud Console, search for "Google Calendar API"
2. Click on the result
3. Click the **"Enable"** button
4. Wait for it to activate

### 3. Create OAuth 2.0 Credentials

1. Go to **"Credentials"** in the left sidebar
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. If prompted, configure the OAuth consent screen first:
   - User Type: External
   - Add basic info (app name: "Dicky Portfolio")
   - Add your email to test users
   - Complete the consent screen
4. Back to "Create Credentials" → "OAuth client ID"
5. Application type: **"Desktop application"**
6. Click **"Create"**
7. A dialog appears with your credentials
8. Click **"Download JSON"** (or the download icon)

### 4. Place Credentials File

```bash
# Move the downloaded file to your backend directory
mv ~/Downloads/client_secret_*.json ~/Workspace/portfolio/backend/credentials.json

# Verify it's in the right place
ls -la ~/Workspace/portfolio/backend/credentials.json
```

### 5. First Authentication (One-Time Setup)

Run the setup script in the backend directory:

```bash
cd ~/Workspace/portfolio/backend
python3 setup_google_calendar.py
```

This script will:
1. Check for `credentials.json`
2. Open a browser for OAuth authentication
3. Ask you to login with your Google account
4. Ask for permission to access calendar
5. Save token to `.gcal_token.json` automatically

**That's it!** The token is reusable and will auto-refresh.

### 6. Verify It Works

Test the availability endpoint:

```bash
curl http://localhost:8000/api/availability?days=7
```

Should return your actual calendar's free slots instead of mock data.

## Troubleshooting

### "credentials.json not found"
- Make sure the file is in `/Users/dickypratama/Workspace/portfolio/backend/`
- File name must be exactly `credentials.json`

### "Authentication failed"
- Delete `.gcal_token.json` file
- Delete `credentials.json` and download again
- Restart the backend and redo step 5

### "Calendar features unavailable"
- Check that Google Calendar API is enabled in Cloud Console
- Verify your Google account has a calendar
- Check backend logs for detailed error

## How It Works

1. **Initial Setup**: You authenticate once via browser OAuth flow
2. **Token Storage**: Token saved in `.gcal_token.json` (auto-refresh)
3. **Availability Check**: When user asks "When are you available?":
   - Backend queries your Google Calendar
   - Finds free slots (9am-5pm, weekdays, 30-min slots)
   - Returns to chatbot for display

## Security Notes

- ✅ Token stored locally (not in code)
- ✅ Read-only access (can't modify calendar)
- ✅ Only you can authenticate (OAuth code flow)
- ✅ Credentials file should be `.gitignore`d

## Environment Variable (Optional)

You can customize in `.env`:
```
CALENDAR_TIMEZONE=Asia/Jakarta  # Change to your timezone
```

Timezone list: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
