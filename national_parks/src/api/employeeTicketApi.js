import axios from 'axios';

export function getEmployeeTickets(username) {
  return axios.get(`/api/employee/tickets/`, {
    params: {username}
  }) .then (response => {console.log(response); return response.data});
}


// .get(`${API_URL}${url}`, {
//   params: data,
//   headers: {
//     Authorization: getAuthorizationToken()
//   }
// })
// .then(handleResponse);