from app.repositories.ticket_repository import TicketRepository
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from fastapi import Depends, FastAPI
from fastapi.responses import JSONResponse



def add_cors_middleware(application: FastAPI):
    allowed_origins = [
        "http://localhost",
        "http://localhost:3000",
    ]
    application.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


app = FastAPI()

add_cors_middleware(app)

TICKET_FILEPATH = "../data/awesome_tickets.json"
ticket_repository = TicketRepository(filepath=TICKET_FILEPATH)
messages = ticket_repository.get_messages()
tickets = ticket_repository.get_tickets()

resolved_tickets = [] # Done Tickets


@app.get("/healthz")
async def root():
    return "OK"


@app.get("/tickets")
async def get_tickets(
    limit: int = 20,
):
    msgs = {}

    for ticket in tickets[:limit]:
        msg_id = ticket.get("msg_id")
        message = messages.get(msg_id)
        msgs[msg_id] = message
    tickets_with_messages = {"tickets": tickets[:limit], "messages": msgs}

    return JSONResponse(tickets_with_messages, status_code=200)


@app.get("/messages")
async def get_messages(msgs: str):
    response = []
    all_messages = msgs.split(",")
    for msg in all_messages:
        response.append(messages.get(msg))
    return JSONResponse({"data": response, "msg": None}, status_code=200)


@app.delete("/ticket/{ticketId}/delete")
async def delete_ticket(ticketId: int):
    tickets.pop(ticketId)
    return JSONResponse({"data": ticketId, "msg": "Ticket Deleted"}, status_code=200)


@app.post("/ticket/{ticketId}/done")
async def resolve_ticket(ticketId: int):
    resolved_tickets.append(tickets[ticketId])
    tickets.pop(ticketId)
    return JSONResponse(
        {"data": ticketId, "msg": "Ticket Has been Resolved ! "}, status_code=200
    )


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=5001, reload=True)
