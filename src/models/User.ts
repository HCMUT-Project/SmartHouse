

export interface UserModel {
  code: string;
  name: string;
  phone: string;
  status: string;
}

export interface LoginModel {
  accessToken: string;
  sharepointToken: string;
  refreshToken: string;
  expiredTime: string;
  user: UserModel;
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