export function createTicket(ticketBody) {
  return new Promise(function(resolve, reject) {
    process.nextTick(() =>
                     ticketBody.description != "fail"
                     ? resolve(ticketBody)
                     : reject({
                       error: 'Failed to create ticket'
                     }),
                    );
  });
}

export function updateTicket(ticketId, ticketBody) {
  return new Promise(function(resolve, reject) {
    process.nextTick(() =>
                     ticketBody.description != "fail"
                     ? resolve(ticketBody)
                     : reject({
                       error: 'Failed to create ticket'
                     }),
                    );
  });
}
