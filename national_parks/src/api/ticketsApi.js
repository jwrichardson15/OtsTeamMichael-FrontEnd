// Mocked createTicket
export function createTicket(body) {
  console.log("Ticket Created -", body);
  return Promise.resolve(body);
}
