const endpoint = 'server.php';

function headers() {
  return new Headers({
    'Content-Type': 'application/json',
    'Authorization': '',
  });
}

function fetchJson(url, method = 'GET') {
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
        return Promise.reject({json: json, response: response});
      });
    });
}

fetchJson(`${endpoint}?code=401`, 'POST').then((json) => {
  console.log(json);
}).catch((error) => {
  console.log(error);
});

fetchJson(`${endpoint}?code=500`).catch((error) => {
  console.log(error);
});
