from typing import List, Dict, Any
from dataclasses import dataclass


@dataclass
class ToolSchema:
    """Tool schema definition for MCP."""
    name: str
    description: str
    input_schema: Dict[str, Any]


def get_search_cv_tool() -> ToolSchema:
    """Search CV for relevant information."""
    return ToolSchema(
        name="search_cv",
        description="Search Dicky's CV for information about work experience, skills, projects, and education",
        input_schema={
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "What to search for in the CV (e.g., 'Go programming', 'experience at Grab', 'skills')"
                },
                "k": {
                    "type": "integer",
                    "description": "Number of results to return (default 4)",
                    "default": 4
                }
            },
            "required": ["query"]
        }
    )


def get_calendar_availability_tool() -> ToolSchema:
    """Get available time slots for discussions."""
    return ToolSchema(
        name="get_calendar_availability",
        description="Get Dicky's available time slots for discussions based on calendar",
        input_schema={
            "type": "object",
            "properties": {
                "days_ahead": {
                    "type": "integer",
                    "description": "How many days ahead to check availability (default 7)",
                    "default": 7
                },
                "duration_minutes": {
                    "type": "integer",
                    "description": "Desired meeting duration in minutes (default 30)",
                    "default": 30
                }
            },
            "required": []
        }
    )


def get_search_github_tool() -> ToolSchema:
    """Search GitHub repositories."""
    return ToolSchema(
        name="search_github",
        description="Search Dicky's GitHub repositories and projects",
        input_schema={
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "Search term for GitHub repos (optional, returns all if not provided)",
                }
            },
            "required": []
        }
    )


def get_all_tools() -> List[ToolSchema]:
    """Get all available tools."""
    return [
        get_search_cv_tool(),
        get_calendar_availability_tool(),
        get_search_github_tool(),
    ]


def tools_to_claude_format(tools: List[ToolSchema]) -> List[Dict[str, Any]]:
    """Convert tool schemas to Claude's tool format."""
    return [
        {
            "name": tool.name,
            "description": tool.description,
            "input_schema": tool.input_schema
        }
        for tool in tools
    ]
