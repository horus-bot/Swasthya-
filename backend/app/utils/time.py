from datetime import datetime, timedelta
from typing import Optional

class TimeUtils:
    @staticmethod
    def format_duration(minutes: float) -> str:
        """Format minutes to human readable duration"""
        if minutes < 60:
            return f"{int(minutes)}m"
        hours = int(minutes // 60)
        mins = int(minutes % 60)
        if mins == 0:
            return f"{hours}h"
        return f"{hours}h {mins}m"

    @staticmethod
    def is_business_hours() -> bool:
        """Check if current time is business hours (8 AM - 6 PM)"""
        now = datetime.now()
        return 8 <= now.hour <= 18

    @staticmethod
    def get_days_until_weekend() -> int:
        """Get days until next weekend"""
        today = datetime.now().weekday()
        if today >= 5:  # Saturday or Sunday
            return 0
        return 5 - today

    @staticmethod
    def parse_time_window(time_window: str) -> int:
        """Parse time window string to days"""
        if time_window.endswith('d'):
            return int(time_window[:-1])
        elif time_window.endswith('w'):
            return int(time_window[:-1]) * 7
        elif time_window.endswith('h'):
            return max(1, int(time_window[:-1]) // 24)
        return 7  # default