from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pathlib import Path

router = APIRouter(prefix="/api", tags=["assets"])


@router.get("/photo")
async def get_photo(request):
    """Get user profile photo."""
    settings = request.app.state.settings
    photo_path = Path(settings.photo_path)
    
    if not photo_path.exists():
        # Try relative to current working directory
        photo_path = Path(settings.photo_path)
        if not photo_path.exists():
            raise HTTPException(status_code=404, detail="Photo not found")
    
    return FileResponse(
        path=photo_path,
        media_type="image/jpeg",
        filename="profile.jpg"
    )
