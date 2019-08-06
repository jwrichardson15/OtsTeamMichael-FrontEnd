import axios from 'axios';
import { authenticationService } from '../services/AuthenticationService';

export function getEmployees() {
  return axios.get(`/api/employee`, {
    headers: {'Authorization': 'Bearer ' + authenticationService.token}
  }).then(response => {return response.data});
}
