import atob from 'atob';

import { getCookieFromBrowser } from './session';

export async function getUserData() {
  const accessToken = await getCookieFromBrowser('token');
  const userDataString = accessToken !== undefined ? atob(accessToken.split('.')[1]) : '{}';
  return JSON.parse(userDataString);
}
