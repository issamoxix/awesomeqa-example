import { updateTickets } from "../../store/action";

export const apiUrl = "http://localhost:5001/"


export const fetchMessages = async (m) => {
    const messagesList = m.join(",")
    var params = new URLSearchParams();
    params.append("msgs", messagesList);
    var url = new URL(`${apiUrl}messages`);
    url.search = params.toString();
    const response = await fetch(url, { method: "GET" })
    const json = await response.json()
    return json
}


export const handleDone = (dispatch, ticketId, updateCount, handleClose) => {
    dispatch(updateTickets(updateCount + 1))
    fetch(`${apiUrl}ticket/${ticketId}/done`, { method: "POST" })
        .then(_ => handleClose())
        .catch(error => console.log('error', error));
}


export const deleteTicket = (dispatch, ticketId, updateCount, handleClose) => {
    dispatch(updateTickets(updateCount + 1))
    fetch(`${apiUrl}ticket/${ticketId}/delete`, { method: "DELETE" })
        .then(_ => handleClose())
        .catch(error => console.log('error', error));
}