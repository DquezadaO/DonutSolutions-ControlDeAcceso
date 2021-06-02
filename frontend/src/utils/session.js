import cookie from 'js-cookie';

// Set the cookie into the browser and the expiring time
export async function setCookie(key, value) {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: '/',
    });
  }
}

// Get the cookie from the browser
export async function getCookieFromBrowser(key) {
  const token = cookie.get(key);
  return token;
}

// Remove the cookie from the browser
export async function removeCookie(key) {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
}
