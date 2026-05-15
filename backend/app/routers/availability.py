from fastapi import APIRouter, Request
from datetime import datetime, timedelta
from typing import Dict, Any

router = APIRouter(prefix="/api", tags=["availability"])


@router.get("/availability")
async def get_availability(
    request: Request,
    days: int = 7,
    duration_minutes: int = 30
) -> Dict[str, Any]:
    """Get available time slots (weekday working hours)."""
    settings = request.app.state.settings

    start_date = datetime.now()
    end_date = start_date + timedelta(days=days)

    # Generate availability - weekdays 9am-5pm with 30-min slots
    slots = []
    current = start_date.replace(hour=9, minute=0, second=0)

    while current < end_date and len(slots) < 10:
        if current.weekday() < 5:  # Monday-Friday
            if current.hour < 17:
                slot_end = current + timedelta(minutes=duration_minutes)
                slots.append({
                    "start": current.isoformat(),
                    "end": slot_end.isoformat(),
                    "duration_minutes": duration_minutes
                })
                current += timedelta(minutes=duration_minutes)
            else:
                current = current.replace(day=current.day + 1, hour=9, minute=0)
        else:
            current = current.replace(day=current.day + 1, hour=9, minute=0)

    return {
        "timezone": settings.calendar_timezone,
        "available_slots": slots,
        "total_slots": len(slots),
        "duration_minutes": duration_minutes
    }
