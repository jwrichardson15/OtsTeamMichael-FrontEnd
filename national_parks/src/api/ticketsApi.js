import axios from 'axios';

// Mocked createTicket
export function createTicket(body) {
  axios.post('/tickets', body).then(handleResponse);
}

function handleResponse(response) {
  return response.data;
}
