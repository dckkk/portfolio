"""Pytest configuration and fixtures."""
import pytest
import sys
from pathlib import Path

# Add app to path
app_path = Path(__file__).parent.parent
sys.path.insert(0, str(app_path))
