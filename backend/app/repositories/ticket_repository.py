import json
from typing import Optional


class TicketRepository:
    def __init__(self, filepath: str):
        with open(filepath) as json_file:
            self.data = json.load(json_file)

    def get_tickets(self, limit: Optional[int] = None) -> list[dict]:
        return self.data["tickets"][:limit]

    def get_messages(self) ->  dict:
        messages = self.data["messages"]
        return {message.get("id"):message for message in messages}