import axios from 'axios';

export function getParks() {
  return axios.get(`/api/public/parks`)
    .then(response => {return response.data});
}
