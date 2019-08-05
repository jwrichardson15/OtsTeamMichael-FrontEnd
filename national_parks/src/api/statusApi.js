import axios from 'axios';

export function getStatuses() {
  return axios.get(`/api/public/statuses`)
    .then(response => {return response.data});
}
