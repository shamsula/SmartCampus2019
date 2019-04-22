const API_ROOT = `${process.env.REACT_APP_API_URL}/api`;

/**
 * Calls SmartCampus API with proper options and formats response
 * @param  {String}  path     Endpoint to hit (e.g. '/events')
 * @param  {String}  method   HTTP verb (e.g. 'GET')
 * @param  {Object}  body     JSON request body
 * @return {Promise(Object)}  Response containing 'status' and 'body'
 */
const apiFetch = (path, method = 'GET', body = null) => {

  const options = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  // Add POST/PUT body, if given
  if (body) {
    options.body = JSON.stringify(body);
  }

  // Add token as header, if in storage
  const token = localStorage.getItem('token');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  // Call the API
  return fetch(`${API_ROOT}${path}`, options).then(response => {
    return response.json().then(json => {
      
      // Wrap response json body with status code
      const status_json = {
        status: response.status,
        body: json
      };

      // Reject promise if bad response
      return response.ok ? status_json : Promise.reject(status_json);
    });
  });
};

//===================================================================
// Request Helpers
//

const requests = {
  del: path =>
    apiFetch(path, 'DELETE'),
  get: path =>
    apiFetch(path, 'GET'),
  put: (path, body) =>
    apiFetch(path, 'PUT', body),
  post: (path, body) =>
    apiFetch(path, 'POST', body)
};

const User = {
  current: () =>
    requests.get('/user'),
  login: (googleIdToken) =>
    requests.post('/user/login', { googleIdToken: googleIdToken })
};

const Event = {
  create: (title, time, location, link, body) =>
    requests.post('/events', { event: { title, time, location, link, body } }),
  delete: (id) =>
    requests.del('/events/' + id),
  get: (id) =>
    requests.get('/events/' + id),
  like: (id) => 
    requests.put('/events/' + id + '/like'),
  unlike: (id) => 
    requests.del('/events/' + id + '/like'),
  attend: (id) => 
    requests.put('/events/' + id + '/attend'),
  unattend: (id) => 
    requests.del('/events/' + id + '/attend'),
  comment: (id, body) =>
    requests.post('/events/' + id + '/comment', {comment: { body } }),
  feed: () =>
    requests.get('/events')
  	
};

const Friends = {
  request: (emailAddress) =>
    requests.post('/friend/friendRequest', {email : emailAddress}),
  requestList: () =>
    requests.get('/friend/friendRequest'),
  accept: (id) =>
    requests.post('/friend/friendRequest/' + id + '/accept'),
  decline: (id) =>
    requests.post('/friend/friendRequest/' + id + '/decline'),
  friendlist: () =>
    requests.get('/friend/'),
  unfriend: (id) =>
    requests.post('/friend/unfriend/' + id)	
};

const Comment = {
  delete: (id) =>
    requests.del('/comment/' + id),
};

export default {
  Comment, Event, User, Friends
};