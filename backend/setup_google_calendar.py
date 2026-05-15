#!/usr/bin/env python3
"""
Google Calendar Setup Script

Run this ONCE to authenticate with Google Calendar.
After running, the token will be saved and reused automatically.

Usage:
    python setup_google_calendar.py
"""

import sys
from pathlib import Path
from app.services.calendar_service import CalendarService


def main():
    print("=" * 60)
    print("Google Calendar Setup")
    print("=" * 60)

    creds_file = Path("credentials.json")
    if not creds_file.exists():
        print("❌ credentials.json not found!")
        print("\nPlease:")
        print("1. Go to: https://console.cloud.google.com/")
        print("2. Create OAuth 2.0 Desktop credentials")
        print("3. Download as JSON and save as 'credentials.json' in this directory")
        print(f"\nExpected path: {creds_file.absolute()}")
        sys.exit(1)

    print("✓ Found credentials.json")
    print("\nAttempting to authenticate with Google Calendar...")
    print("(A browser window will open for you to grant permission)\n")

    calendar_service = CalendarService(
        token_path="./.gcal_token.json",
        timezone="Asia/Jakarta"
    )

    if calendar_service.authenticate():
        print("\n✅ SUCCESS! Google Calendar is now connected!")
        print("\nYour token has been saved to .gcal_token.json")
        print("The backend will automatically use this token from now on.")
        print("\nTest it with:")
        print("    curl http://localhost:8000/api/availability?days=7")
        sys.exit(0)
    else:
        print("\n❌ Authentication failed!")
        print("Please check your credentials.json file and try again.")
        sys.exit(1)


if __name__ == "__main__":
    main()
