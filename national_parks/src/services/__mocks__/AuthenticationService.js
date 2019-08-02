export const authenticationService = {
  login
};

function login(username, password) {
  return new Promise(function(resolve, reject) {
    process.nextTick(() =>
                     username != "fail"
                     ? resolve({'success': true})
                     : reject({
                       error: 'Failed to create ticket'
                     }),
                    );
  });
}
