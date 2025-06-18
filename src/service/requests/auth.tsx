import { resetAndNavigate } from '../../utils/NavigationUtils';
import apiClient from '../apiClient';
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../storage';

export const loginWithGoogle = async (idToken: string) => {
  const { data } = await apiClient.post('/user/login', { id_token: idToken });

  setAccessToken(data?.accessToken);
  setRefreshToken(data?.refreshToken);
  return data?.user;
};

export const logout = async () => {
  // await apiClient.post('/user/logout');

  removeAccessToken();
  removeRefreshToken();
  resetAndNavigate('LoginScreen');
};

export const refresh_tokens = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }
    const { data } = await apiClient.post('/user/refresh', {
      refreshToken,
    });

    if (data?.accessToken) {
      setAccessToken(data?.accessToken);
      return true;
    } else {
      throw new Error('Invalid Refresh response');
    }
  } catch (error) {
    console.log('Token Refresh failed :', error);
    logout();
    return false;
  }
};
