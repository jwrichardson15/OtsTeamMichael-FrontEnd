import axios from 'axios';

export function getCategories() {
  return axios.get(`/api/public/categories`)
    .then(response => {return response.data});
}
