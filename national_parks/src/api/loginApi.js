import axios from 'axios';

const config = { headers: {'Content-Type': 'multipart/form-data' }}

export function login() {
  return axios.post('/auth/login', {"username": "oLogan209", "password": "credera"});
}
