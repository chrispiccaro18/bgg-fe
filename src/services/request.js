const request = (path, method, body) => {
  // eslint-disable-next-line no-undef
  return fetch(`${process.env.API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null  
  })
    .then(res => ([res.ok, res.json()]))
    .then(([ok, json]) => {
      if(!ok) throw 'Unable to fetch.';
      return json;
    });
};

export const post = (path, body) => request(path, 'POST', body);
export const get = path => request(path, 'GET');
export const patch = (path, body) => request(path, 'PATCH', body);
export const del = path => request(path, 'DELETE');
