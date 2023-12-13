
export const UPDATE_TICKETS = 'UPDATE_TICKETS'


export const updateTickets = (nextItem: number) => {
  return {
    type: UPDATE_TICKETS,
    payload: nextItem,
  };
};

