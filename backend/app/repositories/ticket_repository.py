import json


def try_except(func):
    def wrapper(*args, **kwargs):
        try:
            result = func(*args, **kwargs)
            return result
        except Exception as e:
            print("Error in TicketRepository level: ", e) # Change this to logs
            return False
    return wrapper

class TicketRepository:
    def __init__(self, filepath: str):
        with open(filepath) as json_file:
            self.data = json.load(json_file)
        self.tickets = self.data["tickets"]
        self.messages = {
            message.get("id"): message for message in self.data["messages"]
        }
        self.resolved_tickets = []

    @try_except
    def resolve_ticket(self, ticket_id: int):
        self.resolved_tickets.append(self.tickets[ticket_id])
        self.delete_ticket(ticket_id)
        return True

    @try_except
    def delete_ticket(self, ticket_id:int):
        self.tickets.pop(ticket_id)
        return True
