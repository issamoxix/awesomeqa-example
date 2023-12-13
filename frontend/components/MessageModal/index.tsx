import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, List, ListItem, Avatar, Button, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MessageType } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTicket, fetchMessages, handleDone } from './functions';

export default function MessageModal({ open, handleClose, contextMessages, message, ticketId }: { message: MessageType, contextMessages: string[], open: boolean, handleClose: any, ticketId: number }) {
  const [messages, setMessages] = useState([])
  const dispatch = useDispatch()
  const updateCount = useSelector((state: any) => state.updateCount)

  const formatDateDistance = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const handleOpen = () => {
    window.open(message.msg_url, "_blank")
  };


  useEffect(() => {
    if (open) {
      fetchMessages(contextMessages).then((data) => setMessages(data.data))
    }
  }, [open])
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ bgcolor: '#090909e0', color: 'white' }}>
        Message
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'grey.300',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ bgcolor: '#121212' }}>
        <List>
          <ListItem>
            <Avatar sx={{ bgcolor: 'secondary.main' }} src={message.author.avatar_url} />
            <ListItemText primary={message.author.name} secondary={formatDateDistance(message.timestamp)} sx={{ marginX: 2 }} />
            <Button variant="contained" sx={{ marginX: 1, bgcolor: "#5c51be", color: "#fff" }} onClick={handleOpen}>Open</Button>
            <Button variant="contained" sx={{ marginX: 1, bgcolor: "#79b071" }} onClick={() => handleDone(dispatch, ticketId, updateCount, handleClose)} >Done</Button>
            <Button variant="contained" color="error" sx={{ marginX: 1 }} onClick={() => deleteTicket(dispatch, ticketId, updateCount, handleClose)}>Delete</Button>
          </ListItem>
          <Typography variant="subtitle1" sx={{ marginY: 2, color: 'grey.500' }}>
            {message.content}
          </Typography>
          <Typography variant="h6" sx={{ marginY: 2, color: 'white' }}>
            Context Messages
          </Typography>
          {messages && messages.map((m: MessageType, index) => (
            <ListItem key={index}>
              <Avatar sx={{ bgcolor: 'secondary.light' }} src={m.author.avatar_url} />
              <ListItemText primary={m.author.name} secondary={m.content} sx={{ marginX: 2 }} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
