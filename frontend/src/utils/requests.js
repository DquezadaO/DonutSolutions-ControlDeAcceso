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
