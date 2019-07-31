import axios from 'axios';

export function updateTicket(ticketId, updatedTicket) {
  console.log(updatedTicket);
  return axios.put(`/api/tickets/${ticketId}`, updatedTicket)
  .then(response => {return response.data});
}