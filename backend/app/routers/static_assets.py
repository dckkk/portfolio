from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import FileResponse
from pathlib import Path

router = APIRouter(prefix="/api", tags=["assets"])


@router.get("/photo")
async def get_photo(request: Request):
    """Get user profile photo."""
    settings = request.app.state.settings
    photo_path = Path(settings.photo_path)

    if not photo_path.exists():
        # Try with absolute path or from backend directory
        backend_dir = Path(__file__).parent.parent.parent
        alt_path = backend_dir / settings.photo_path
        if alt_path.exists():
            photo_path = alt_path
        else:
            raise HTTPException(status_code=404, detail="Photo not found")

    return FileResponse(
        path=str(photo_path.resolve()),
        media_type="image/jpeg",
        filename="profile.jpg"
    )
