
export interface UserModel {
  id: string;
  avatar: string;
  name: string;
  email: string;
  phoneNumber: string;
}
export interface LoginModel {
  accessToken: string;
  id: string;
  avatar: string;
  name: string;
  email: string;
  phoneNumber: string;
}
export interface ConfigAppModel {
  app: 'DELIVERY';
  platform: 'android' | 'ios';
  version: string;
  build: number | string;
  vnMessage: string;
  enMessage: string;
  store: string;
  isWarning: boolean;
  isRequire: boolean;
  isHandleAccount: boolean;
  api: string;
}
export interface RefreshTokenModel {
  accessToken: string;
  refreshToken: string
}