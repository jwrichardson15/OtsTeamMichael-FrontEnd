import axios from 'axios';

export function createTicket(ticketBody) {
  return axios.post('/api/tickets', ticketBody).then(response => {return response.data});
}

export function updateTicket(ticketId, updatedTicket) {
  console.log(updatedTicket);
  return axios.put(`/api/tickets/${ticketId}`, updatedTicket)
  .then(response => {return response.data});
}
