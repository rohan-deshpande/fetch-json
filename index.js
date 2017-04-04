const endpoint = 'server.php';

function headers() {
  return new Headers({
    'Content-Type': 'application/json',
    'Authorization': '',
  });
}

function fetchJson(url, method = 'GET') {
  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  return fetch(url, { method: method, headers: headers() })
    .then((response) => {
      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.indexOf('application/json') < 0) {
        throw new TypeError('Response content-type is not application/json');
      }

      if (response.ok) {
        return response.text().then((text) => {
          response.json = isJson(text) ? JSON.parse(text) : null;
          return Promise.resolve(response);
        });
      }

      return response.text().then((text) => {
        response.json = isJson(text) ? JSON.parse(text) : null;
        return Promise.reject(response);
      });
    });
}

fetchJson(`${endpoint}?code=200`, 'POST').then((payload) => {
  console.log(payload);
}).catch((payload) => {
  console.log(payload);
});

fetchJson(`${endpoint}?code=200_noJson`, 'POST').then((payload) => {
  console.log(payload);
}).catch((payload) => {
  console.log(payload);
});

fetchJson(`${endpoint}?code=500`).catch((response) => {
  console.log(response);
});

fetchJson(`${endpoint}?code=500_noJson`).catch((response) => {
  console.log(response);
});

fetchJson(`${endpoint}?code=422`).catch((response) => {
  console.log(response);
});
