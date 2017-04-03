const endpoint = 'server.php';

function headers() {
  return new Headers({
    'Content-Type': 'application/json',
    'Authorization': '',
  });
}

function request(url, method = 'GET') {
  return fetch(url, {method: method, headers: headers()})
    .then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          // do default stuff to handle success here
          return Promise.resolve(json);
        });
      }

      return response.json().then((json) => {
        // do default stuff to handle error here
        return Promise.reject(Object.assign(json, { response }));
      });
    });
}

// function request(url, method = 'GET', actions = {}) {
//   function handleUnauthorized() {
//     console.log('Refresh Token');
//   }
//
//   function handleSuccess(response, actions) {
//     return response.json().then((json) => {
//       if (actions && typeof actions.onSuccess === 'function') {
//         actions.onSuccess(json);
//       }
//     });
//   }
//
//   function handleFailure(response, actions) {
//     return response.json().then((json) => {
//       if (actions && typeof actions.onFail === 'function') {
//         actions.onFail(json);
//       }
//
//       handleError(response.status, response.statusText);
//     });
//   }
//
//   function handleError(status, text) {
//     let error = text;
//
//     if (status === 422) {
//       error = 'Unprocessable Entity';
//     }
//
//     throw new Error(error);
//   }
//
//   function triage(response, actions) {
//     if (response.ok) {
//       return handleSuccess(response, actions);
//     }
//
//     if (response.status === 401) {
//       return handleUnauthorized();
//     }
//
//     return handleFailure(response, actions);
//   }
//
//   return fetch(url, { method: method, headers: headers() })
//     .then((response) => triage(response, actions))
//     .catch(console.error);
// }

request(`${endpoint}?code=401`, 'POST').then((json) => {
  console.log(json);
}).catch((error) => {
  console.log(error);
});
// request(`${endpoint}?code=200`, 'GET', {
//   onSuccess: function (payload) {
//     console.log(payload);
//   },
//   onFail: function (payload) {
//     console.log(payload);
//   }
// });
// request(`${endpoint}?code=422`, 'GET', {
//   onFail: function (payload) {
//     return payload;
//   }
// }).then((result) => {
//   console.log(result);
// });
request(`${endpoint}?code=500`).catch((error) => {
  console.log(error);
});
