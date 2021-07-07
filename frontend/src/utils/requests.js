import axios from 'axios';

export async function post(endpoint, data, token = null) {
  const headers = token
    ? {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    : {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  return axios.post(endpoint, data, headers);
}

export async function get(endpoint, token) {
  const headers = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : null;
  return axios.get(endpoint, headers);
}

export async function remove(endpoint, token) {
  const headers = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : null;
  return axios.delete(endpoint, headers);
}

export async function put(endpoint, data, token) {
  const headers = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : null;
  return axios.put(endpoint, data, headers);
}
