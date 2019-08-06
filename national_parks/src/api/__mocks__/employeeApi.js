export function getEmployees() {
  return new Promise(function(resolve, reject) {
    resolve([
      {
        'id': 1,
        'name': 'employee1'
      }
    ]);
  });
}
