import { HttpData, get, post } from '../../helpers/api.helper';
import { DeviceModel } from '../../models/Devices';

export async function getAir(): Promise<HttpData<DeviceModel>> {
  const result = await get('data/lastfan');
  if (result?.error) {
    return result;
  }
  if (result.data?.message !== 'successful') {
    return {
      error: 'api',
      message: 'Có lỗi xảy ra, không lấy được nhiệt độ',
    };
  }
  return {
    data: result.data as DeviceModel,
    message: result?.data?.message,
  };
}
export async function getLed(): Promise<HttpData<DeviceModel>> {
  const result = await get('data/lastled');
  if (result?.error) {
    return result;
  }
  if (result.data?.message !== 'successful') {
    return {
      error: 'api',
      message: 'Có lỗi xảy ra, không lấy được thông tin đèn',
    };
  }
  return {
    data: result.data as DeviceModel,
    message: result?.data?.message,
  };
}
export async function getTemp(): Promise<HttpData<DeviceModel>> {
  const result = await get('data/lasttemperature');
  if (result?.error) {
    return result;
  }
  if (result.data?.message !== 'successful') {
    return {
      error: 'api',
      message: 'Có lỗi xảy ra, không lấy được thông tin đèn',
    };
  }
  return {
    data: result.data as DeviceModel,
    message: result?.data?.message,
  };
}