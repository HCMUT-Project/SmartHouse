import { ChangePwdDTO, LoginDTO, SignUpDTO } from '../../dto';
import { LoginModel, UserModel } from '../../models';
import { HttpData, get, post } from '../../helpers/api.helper';
import { ApiModel } from '../reducer/profile/user.reducer';

export async function loginAPI({
  ...input
}: LoginDTO): Promise<HttpData<LoginModel>> {
  const result = await post('auth/login', input);
  if (result?.error) {
    return result;
  }
  if (result.data?.resultCode !== 1) {
    return {
      error: 'api',
      message: result.data?.message,
    };
  }
  return {
    data: result.data?.data as LoginModel,
    message: result?.data?.message,
  };
}
export async function changePwdAPI({
  ...input
}: ChangePwdDTO): Promise<HttpData<UserModel>> {
  const result = await post('auth/change-password', input);
  if (result?.error) {
    return result;
  }
  if (result.data?.data?.resultCode !== 1) {
    return {
      error: 'api',
      message: result?.data?.data.message,
    };
  }
  return {
    message: result?.data?.data.message,
  };
}
export async function signUpAPI(input: SignUpDTO): Promise<HttpData<ApiModel>> {
  const result = await post('auth/register-account', input);
  if (result?.error) {
    return result;
  }
  if (result.data?.resultCode !== 1) {
    return {
      error: 'Api',
      message: result?.data?.message,
    };
  }
  return {
    message: result?.data?.message,
  };
}