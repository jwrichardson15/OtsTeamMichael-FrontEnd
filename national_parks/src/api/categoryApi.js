import axios from 'axios';

export function getCategories() {
  return axios.get(`/api/categories`)
    .then(response => {return response.data});
}
