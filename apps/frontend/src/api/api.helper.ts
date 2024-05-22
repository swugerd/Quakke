import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/index.constants';
import { ITokens } from '@/types/user.interface';
import Cookies from 'js-cookie';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getContentType = () => ({
  'Content-Type': 'application/json',
});

export const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message;

  return message
    ? typeof error.response.data.message === 'object'
      ? message[0]
      : message
    : error.message;
};

export const getAccessToken = () => {
  const accessToken = Cookies.get(ACCESS_TOKEN);
  return accessToken || null;
};

export const getRefreshToken = () => {
  const refreshToken = Cookies.get(REFRESH_TOKEN);
  return refreshToken || null;
};

export const saveTokens = (data: ITokens) => {
  Cookies.set(ACCESS_TOKEN, data.accessToken);
  Cookies.set(REFRESH_TOKEN, data.refreshToken);
};

export const removeTokens = () => {
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
};
