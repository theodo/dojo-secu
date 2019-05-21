import jwt_decode from 'jwt-decode';
import request from 'superagent';

const baseUrl = 'https://api.github.com';
const backendBaseUrl = process.env.REACT_APP_API_BASE_URL || '';

interface AccessToken {
  exp: number;
}

function update_token(token: string) {
  localStorage.setItem('token', token);
}

function getTimestampInSeconds(): number {
  return new Date().getTime() / 1000;
}

function isTokenValid(token: AccessToken): boolean {
  if (!token.exp) {
    return false;
  }

  return token.exp - getTimestampInSeconds() >= 10;
}

/**
 * This function assess the access token is still valid before calling a requestFunction, if not it refreshes it.
 * In case of error during the refresh process it disconnects the user and redirects him to login page
 * @param requestFunction
 */
const checkAccessToken = async (requestFunction: Function) => {
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwt_decode<AccessToken>(token) : { exp: 0 };
  if (!isTokenValid(decodedToken)) {
    try {
      const response = await request.post(`${backendBaseUrl}/auth/jwt/refresh`).withCredentials();
      await update_token(response.body.access);
      return requestFunction();
    } catch (e) {
      // LOGOUT
    }
  }

  return requestFunction();
};

export const makeGetRequest = async (endpoint: string, data: {} | null = null) =>
await checkAccessToken(() => {
    const token = localStorage.getItem('token');
    if (data === null) {
      return request
        .get(`${backendBaseUrl}${endpoint}`)
        .set('Accept', 'application/json')
        .set('Authorization', token ? `Bearer ${token}` : '');
    }

    return request
      .get(`${baseUrl}${endpoint}`)
      .query(data)
      .set('Accept', 'application/json')
      .set('Authorization', token ? token : '');
  });

export const makePostRequest = async (endpoint: string, data: {}) =>
  await checkAccessToken(() =>
    request
      .post(`${baseUrl}${endpoint}`)
      .send(data)
      .set('Accept', 'application/json'),
  );


export const makePutRequest = async (endpoint: string, data: {}, query: {}) =>
  await checkAccessToken(() => {
      const token = localStorage.getItem('token');

      return request
          .put(`${backendBaseUrl}${endpoint}`)
          .query(query)
          .send(data)
          .set('Accept', 'application/json')
          .set('Authorization', token ? `Bearer ${token}` : '');
  });

export const makeLoginRequest = (endpoint: string, data: {}) =>
  request.post(`${backendBaseUrl}${endpoint}`).send(data).withCredentials();

export const login = async (endpoint: string, data: {}) => {
  const response = await makeLoginRequest(endpoint, data);
  const token: string | undefined = response.body.token || response.body.access;
  if (token) {
    await update_token(token);
  }
  return token;
};
