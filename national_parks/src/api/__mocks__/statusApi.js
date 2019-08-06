export function getStatuses() {
  return new Promise(function(resolve, reject) {
    resolve([
      {
        'id': 1,
        'name': 'status1'
      },
      {
        'id': 2,
        'name': 'status2'
      },
      {
        'id': 3,
        'name': 'status3'
      }
    ]);
  });
}
