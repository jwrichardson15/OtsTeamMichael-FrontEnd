export function getEmployeeTickets(username) {
  return new Promise(function(resolve, reject) {
    resolve([
      {
        'id': 1729,
        'status': 'Open',
        'categoryName': 'testCategory',
        'employeeUsername': username
      }
    ]);
  });
}

export function getParkTickets(park) {
  return new Promise(function(resolve, reject) {
    resolve([
      {
        'id': 1337,
        'status': 'Open',
        'categoryName': 'getParksTicket',
        'employeeUsername': park
      }
    ]);
  });
}
