import jwtDecode from 'jwt-decode'
import { Roles } from '../types/User'

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userFirstName: string;
  userId: number;
}

type AccessToken = {
  exp: number,
  user_name: string,
  authorities: Role[],
}

export type Role = 'ROLE_ESTOQUISTA' | 'ROLE_ADMIN';

export const CLIENT_ID='b9149d72b4f5691835a7536a538b3c2c'
export const CLIENT_SECRET='b9149d72b4f5691835a7536a538b3c2c'
export const JWT_SECRET='b9149d72b4f5691835a7536a538b3c2c'
export const JWT_DURATION=3600000


export const saveSessionData = (loginResponse: LoginResponse) => {
  localStorage.setItem("sessionData", JSON.stringify(loginResponse));
}

export const getSessionData = () => {
  const sessionData = localStorage.getItem("sessionData") ?? '{}';
  const parsedSessionData = JSON.parse(sessionData);
  return parsedSessionData as LoginResponse;
}

export const getAccessTokenDecoded = () => {
  const accessToken = getSessionData().access_token

  try {
    const tokenDecoded = jwtDecode(accessToken)

    return tokenDecoded as AccessToken
  } catch (error) {
    return { } as AccessToken
  }
}

export const isTokenValid = () => {
  const {exp} = getAccessTokenDecoded();

  return(Date.now() <= exp * 1000)
}

export const isAuthenticated = () => {
  const {access_token} = getSessionData();

  return access_token && isTokenValid();
}

export const isAllowedRole = (routesRoles: Role[]=[]) => {
  if (routesRoles.length === 0){
    return true
  }

  const {authorities} = getAccessTokenDecoded()

  return routesRoles.some(role => authorities?.includes(role))
}