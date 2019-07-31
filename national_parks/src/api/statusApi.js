import axios from 'axios';

export function getStatuses() {
  return axios.get(`/api/statuses`)
    .then(response => {return response.data});
}