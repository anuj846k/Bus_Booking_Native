import { Platform } from 'react-native';

export const BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost:8000';

// USE NETWORK IP OR HOSTED URL
// export const BASE_URL = 'http://192.168.1.100:8000';

// THIS IS BACKEND URL
// export const BASE_URL = 'http://192.168.1.100:8000';
