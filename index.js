const endpoint = 'server.php';
const DEFAULT_METHOD = 'GET';
const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};
const DEFAULT_BODY = null;

class Fetch {
  static isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  static json(url, options = { method: DEFAULT_METHOD, headers: DEFAULT_HEADERS, body: DEFAULT_BODY }) {
    return fetch(url, {
      method: options.method ? options.method : DEFAULT_METHOD,
      headers: new Headers(options.headers ? options.headers : DEFAULT_HEADERS),
      body: options.body ? JSON.stringify(options.body) : DEFAULT_BODY,
    })
      .then((response) => {
        const contentType = response.headers.get('Content-Type');

        if (contentType && contentType.indexOf('application/json') < 0) {
          throw new TypeError('Content-Type of response is not application/json');
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
      })
      .catch((error) => {
        if (typeof error !== 'object') {
          console.error(error);
        }

        return Promise.reject(error);
      });
  }
}


Fetch.json(`${endpoint}?code=200`, {
  method: 'POST'
}).then((payload) => {
  console.log(payload);
}).catch((payload) => {
  console.log(payload);
});

Fetch.json(`${endpoint}?code=200_noJson`, {
  method: 'POST'
}).then((payload) => {
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

function testChain(endpoint) {
  return Fetch.json(endpoint, {
    method: 'POST',
    body: {'some': 'thing'}
  }).then((payload) => {
    console.log('do some default stuff before resolving a promise');
    return Promise.resolve(payload);
  }).catch((payload) => {
    console.log('do some default stuff before rejecting a promise');
    return Promise.reject(payload);
  });
}

testChain(`${endpoint}?code=200`)
  .then((payload) => {
    console.log(payload);
    console.log('chain worked!');
  })
  .catch((error) => {
    console.log(error);
    console.log('error chain worked!');
  });

testChain(`${endpoint}?code=200`)
  .then((payload) => {
    console.log(payload);
    console.log('run custom success code');
  })
  .catch((error) => {
    console.log(error);
    console.log('run custom fail code');
  });
