from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
import pytz
from google.oauth2.service_account import Credentials
from google_auth_httplib2 import AuthorizedHttp
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials as UserCredentials
from google_auth_oauthlib.flow import InstalledAppFlow
import pickle
import os
from pathlib import Path


class CalendarService:
    def __init__(self, token_path: str = "./.gcal_token.json", timezone: str = "Asia/Jakarta"):
        self.token_path = Path(token_path)
        self.timezone = pytz.timezone(timezone)
        self.scopes = ["https://www.googleapis.com/auth/calendar.readonly"]
        self.service = None
        self.authenticated = False
    
    def authenticate(self, credentials_file: str = "credentials.json") -> bool:
        """Authenticate with Google Calendar API."""
        try:
            creds = None
            
            # Load existing token
            if self.token_path.exists():
                with open(self.token_path, 'rb') as token_file:
                    creds = pickle.load(token_file)
            
            # Refresh token if needed
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            elif not creds:
                # New authentication
                if not Path(credentials_file).exists():
                    print(f"Warning: {credentials_file} not found. Calendar features unavailable.")
                    return False
                
                flow = InstalledAppFlow.from_client_secrets_file(
                    credentials_file, self.scopes
                )
                creds = flow.run_local_server(port=0)
                
                # Save token for next time
                with open(self.token_path, 'wb') as token_file:
                    pickle.dump(creds, token_file)
            
            self.service = build('calendar', 'v3', credentials=creds)
            self.authenticated = True
            return True
        
        except Exception as e:
            print(f"Calendar authentication failed: {e}")
            return False
    
    def get_availability(
        self,
        start_date: datetime,
        end_date: datetime,
        duration_minutes: int = 30,
        working_hours: tuple = (9, 18)
    ) -> List[Dict[str, Any]]:
        """Get available time slots within date range."""
        if not self.authenticated:
            print("Not authenticated with Google Calendar")
            return []
        
        try:
            # Get calendar events
            events_result = self.service.events().list(
                calendarId='primary',
                timeMin=start_date.isoformat(),
                timeMax=end_date.isoformat(),
                singleEvents=True,
                orderBy='startTime',
                fields='items(id,start,end,summary)',
            ).execute()
            
            events = events_result.get('items', [])
            
            # Build busy times
            busy_times = []
            for event in events:
                start = self._parse_time(event.get('start'))
                end = self._parse_time(event.get('end'))
                if start and end:
                    busy_times.append((start, end))
            
            # Calculate free slots
            free_slots = self._calculate_free_slots(
                start_date, end_date, busy_times, duration_minutes, working_hours
            )
            
            return free_slots
        
        except Exception as e:
            print(f"Error getting availability: {e}")
            return []
    
    def _parse_time(self, time_str: Dict) -> Optional[datetime]:
        """Parse Google Calendar time format."""
        try:
            if 'dateTime' in time_str:
                return datetime.fromisoformat(time_str['dateTime'].replace('Z', '+00:00')).astimezone(self.timezone)
            elif 'date' in time_str:
                return datetime.fromisoformat(time_str['date']).replace(tzinfo=self.timezone)
        except:
            pass
        return None
    
    def _calculate_free_slots(
        self,
        start: datetime,
        end: datetime,
        busy_times: List[tuple],
        duration_minutes: int,
        working_hours: tuple
    ) -> List[Dict[str, Any]]:
        """Calculate free slots avoiding busy times and non-working hours."""
        free_slots = []
        current = start.replace(hour=working_hours[0], minute=0, second=0)
        
        while current < end:
            # Skip if outside working hours or weekend
            if current.hour >= working_hours[1] or current.weekday() >= 5:
                current += timedelta(days=1)
                current = current.replace(hour=working_hours[0], minute=0)
                continue
            
            slot_end = current + timedelta(minutes=duration_minutes)
            
            # Check if slot overlaps with busy times
            is_free = True
            for busy_start, busy_end in busy_times:
                if not (slot_end <= busy_start or current >= busy_end):
                    is_free = False
                    break
            
            if is_free and slot_end <= end.replace(hour=working_hours[1]):
                free_slots.append({
                    "start": current.isoformat(),
                    "end": slot_end.isoformat(),
                    "duration_minutes": duration_minutes
                })
            
            current += timedelta(minutes=duration_minutes)
        
        return free_slots[:5]  # Return top 5 slots


def get_calendar_service(token_path: str = "./.gcal_token.json", timezone: str = "Asia/Jakarta") -> CalendarService:
    """Factory function to get calendar service."""
    return CalendarService(token_path, timezone)
