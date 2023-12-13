import * as React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { List } from "@mui/material";
import Ticket from "../../components/Ticket";
import Head from "next/head";
import { MessageType, TicketType } from "../../types";
import { useSelector } from "react-redux"




const Home: NextPage = () => {
    const [tickets, setTickets] = React.useState<TicketType[]>([])
    const [messages, setMessages] = React.useState<MessageType>()
    const updateCount = useSelector((state: any) => state.updateCount)
    const fetchTickets = async () => {
        const url = "http://localhost:5001/tickets?limit=10"
        const response = await fetch(url)
        const json = await response.json()
        return json
    }

    React.useEffect(() => {
        fetchTickets().then((data) => {
            setTickets(data.tickets)
            setMessages(data.messages)
        })
    }, [updateCount])
    return (
        <>
            <Head>
                <title>Tickets</title>
            </Head>
            <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>

                            <List>
                                {tickets && tickets.map((ticket: TicketType, id) => (
                                    <Ticket key={ticket.id} id={id} ticket={ticket} message={messages[ticket.msg_id]} />
                                ))}
                            </List>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Home;
