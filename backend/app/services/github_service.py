import httpx
from typing import List, Dict, Any
from datetime import datetime, timedelta


class GitHubService:
    def __init__(self, username: str):
        self.username = username
        self.base_url = "https://api.github.com"
        self.cache: Dict[str, Any] = {}
        self.cache_time: Dict[str, datetime] = {}
        self.cache_ttl_minutes = 60
    
    def is_cache_valid(self, key: str) -> bool:
        """Check if cache entry is still valid."""
        if key not in self.cache_time:
            return False
        age = (datetime.now() - self.cache_time[key]).total_seconds() / 60
        return age < self.cache_ttl_minutes
    
    async def get_repos(self) -> List[Dict[str, Any]]:
        """Fetch user's public repositories."""
        cache_key = f"repos_{self.username}"
        
        if self.is_cache_valid(cache_key):
            return self.cache[cache_key]
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/users/{self.username}/repos",
                    params={"sort": "updated", "per_page": 20}
                )
                response.raise_for_status()
                repos = response.json()
                
                # Process repos
                processed = []
                for repo in repos:
                    processed.append({
                        "name": repo["name"],
                        "description": repo["description"] or "",
                        "url": repo["html_url"],
                        "language": repo["language"] or "Unknown",
                        "stars": repo["stargazers_count"],
                        "forks": repo["forks_count"],
                        "updated_at": repo["updated_at"],
                    })
                
                # Cache result
                self.cache[cache_key] = processed
                self.cache_time[cache_key] = datetime.now()
                
                return processed
        except Exception as e:
            print(f"Error fetching GitHub repos: {e}")
            return []
    
    async def search_repos(self, query: str) -> List[Dict[str, Any]]:
        """Search user's repos by name or description."""
        repos = await self.get_repos()
        query_lower = query.lower()
        
        results = []
        for repo in repos:
            if (query_lower in repo["name"].lower() or 
                query_lower in repo["description"].lower() or
                query_lower in repo["language"].lower()):
                results.append(repo)
        
        return results
    
    def get_profile_url(self) -> str:
        """Get GitHub profile URL."""
        return f"https://github.com/{self.username}"


def get_github_service(username: str) -> GitHubService:
    """Factory function to get GitHub service."""
    return GitHubService(username)
