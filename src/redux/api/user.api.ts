import {LoginDTO} from '../../dto';
import {LoginModel} from '../../models';
import {HttpData, post} from '../../helpers/api.helper';

export async function loginAPI({
  ...input
}: LoginDTO): Promise<HttpData<LoginModel>> {
  const result = await post('user/login', input);
  if (result?.error) {
    return result;
  }
  return {data: result?.data as LoginModel};
}
