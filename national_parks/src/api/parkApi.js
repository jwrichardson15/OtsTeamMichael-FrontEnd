import axios from 'axios';

export function getParks() {
  return axios.get(`/api/parks`)
    .then(response => {return response.data});
}
