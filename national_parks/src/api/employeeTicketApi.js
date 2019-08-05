import axios from 'axios';

export function getEmployeeTickets(username) {
  return axios.get(`/api/employee/tickets/`, {
    params: {username}
  }).then (response => {return response.data});
}

export function getParkTickets(park) {
  return axios.get(`/api/tickets/`, {
    params: {park}
  }).then (response => {console.log(response); return response.data});
}
