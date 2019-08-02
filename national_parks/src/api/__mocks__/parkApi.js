export function getParks() {
  return new Promise(function(resolve, reject) {
    resolve([
      {
        'id': 1,
        'parkName': 'park1'
      },
      {
        'id': 2,
        'parkName': 'park2'
      },
      {
        'id': 3,
        'parkName': 'park3'
      }
    ]);
  });
}
