import axios from 'axios';
import { authenticationService } from '../services/AuthenticationService';

export function createTicket(ticketBody) {
  return axios.post('/api/public/tickets', ticketBody).then(response => {return response.data});
}

export function updateTicket(ticketId, updatedTicket) {
  console.log(updatedTicket);
  return axios.put(`/api/tickets/${ticketId}`, updatedTicket, {headers:{'Authorization': 'Bearer ' + authenticationService.token}})
  .then(response => {return response.data});
}
