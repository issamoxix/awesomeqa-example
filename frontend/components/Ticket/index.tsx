import * as React from "react";
import { Avatar, Button, Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Grid from "@mui/material/Grid";
import style from "./ticket.module.css"
import { formatDistanceToNow } from "date-fns";
import { MessageType, TicketType } from "../../types";
import MessageModal from "../MessageModal";

export default function Ticket({ ticket, message, id }: { id:number , ticket: TicketType, message: MessageType }) {
    const [show, setShow] = React.useState(false)
    const handleClick = async () => {
        console.log("clicked");
    };
    const handleOpen = () => {
        window.open(message.msg_url, "_blank")
    };

    const handleDelete = (ticketId) => {
        setShow(!show)
        console.log(`Delete ticket with ID: ${ticketId}`);
    };
    const formatDateDistance = (date) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    };
    return <React.Fragment key={ticket.id}>
        <ListItem className={style.listItem}>
            <ListItemAvatar>
                <Avatar src={message?.author.avatar_url} alt={message?.author.name} />
            </ListItemAvatar>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                    <ListItemText
                        primary={message.author.name}
                        secondary={message.content.length > 81 ? `${message.content.substring(0, 80)}...` : message.content}
                        title={message.content}
                    />
                </Grid>
                <Grid item xs={4}>
                    <ListItemText secondary={formatDateDistance(ticket.timestamp)} />
                </Grid>
            </Grid>
            <div className={style.btnContainer}>
                <Button className={style.btn} variant="contained" style={{ backgroundColor: '#5c51be', color: "white" }} color="primary" onClick={() => handleOpen()}>
                    Open
                </Button>
                <Button variant="contained" style={{ backgroundColor: '#79b071', color: "black" }} color="secondary" onClick={() => handleDelete(ticket.id)}>
                    Resolve
                </Button>
            </div>
        </ListItem>
        <Divider />
        <MessageModal ticketId={id} open={show} handleClose={()=>setShow(!show)} message={message} contextMessages={ticket.context_messages} />
    </React.Fragment>
}

