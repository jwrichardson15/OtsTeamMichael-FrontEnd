// Mocked getAllCategories
export function getAllCategories() {
  return Promise.resolve([
    {
      id: 1,
      name: 'Category 1'
    },
    {
      id: 2,
      name: 'Category 2'
    }]);
}
