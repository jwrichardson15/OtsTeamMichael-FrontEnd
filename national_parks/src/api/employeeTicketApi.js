import axios from 'axios';

export function getEmployeeTickets(username) {
  return axios.get(`/api/employee/tickets/`, {
    params: {username}
  }) .then (response => {console.log(response); return response.data});
}