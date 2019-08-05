export function getCategories() {
  return new Promise(function(resolve, reject) {
    resolve([
      {
        'id': 1,
        'name': 'category1'
      },
      {
        'id': 2,
        'name': 'category2'
      },
      {
        'id': 3,
        'name': 'category3'
      }
    ]);
  });
}
