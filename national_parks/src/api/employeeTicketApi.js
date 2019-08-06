import axios from 'axios';
import { authenticationService } from '../services/AuthenticationService';

export function getEmployeeTickets(username) {
  return axios.get(`/api/employee/tickets/`, {
    params: {username},
    headers: {'Authorization': 'Bearer ' + authenticationService.token}
  }).then (response => {return response.data});
}

export function getParkTickets(park) {
  return axios.get(`/api/tickets/`, {
    params: {park},
    headers: {'Authorization': 'Bearer ' + authenticationService.token}
  }).then (response => {console.log(response); return response.data});
}
