const endpoint = 'server.php';

function headers() {
  return new Headers({
    'Content-Type': 'application/json',
    'Authorization': '',
  });
}

class Fetch {
  static isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  static json(url, method = 'GET') {
    return fetch(url, { method: method, headers: headers() })
      .then((response) => {
        const contentType = response.headers.get('Content-Type');

        if (contentType && contentType.indexOf('application/json') < 0) {
          throw new TypeError('Response content-type is not application/json');
        }

        if (response.ok) {
          return response.text().then((text) => {
            response.json = Fetch.isJson(text) ? JSON.parse(text) : null;
            return Promise.resolve(response);
          });
        }

        return response.text().then((text) => {
          response.json = Fetch.isJson(text) ? JSON.parse(text) : null;
          return Promise.reject(response);
        });
      }).catch((error) => {
        if (typeof error !== 'object') {
          console.error(error);
        }

        return Promise.reject(error);
      });
  }
}

Fetch.json(`${endpoint}?code=200`, 'POST').then((payload) => {
  console.log(payload);
}).catch((payload) => {
  console.log(payload);
});

Fetch.json(`${endpoint}?code=200_noJson`, 'POST').then((payload) => {
  console.log(payload);
}).catch((payload) => {
  console.log(payload);
});

Fetch.json(`${endpoint}?code=500`).catch((response) => {
  console.log(response);
});

Fetch.json(`${endpoint}?code=500_noJson`).catch((response) => {
  console.log(response);
});

Fetch.json(`${endpoint}?code=422`).catch((response) => {
  console.log(response);
});
