// Mocked getAllParks
export function getAllParks() {
  return Promise.resolve([
    {
      id: 1,
      name: 'Park 1'
    },
    {
      id: 2,
      name: 'Park 2'
    }]);
}
