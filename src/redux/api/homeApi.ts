import { HttpData, get, post } from '../../helpers/api.helper';
import { DeviceModel, Noti, TempData } from '../../models/Devices';

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
export async function setLed(isOn: boolean): Promise<HttpData<any>> {
  let input = { value: isOn ? '1' : 0 }
  const result = await post('data/setled', input);
  if (result?.error) {
    return {
      error: 'api',
      message: 'Có lỗi xảy ra, không ' + isOn ? ' bật ' : ' tắt ' + 'được máy đèn',
    };
  }
  return {
    message: result.data?.message
  }
}
export async function setFan(isOn: boolean): Promise<HttpData<any>> {
  let input = { value: isOn ? '1' : 0 }
  const result = await post('data/setfan', input);
  if (result?.error) {
    return {
      error: 'api',
      message: 'Có lỗi xảy ra, không ' + isOn ? ' bận ' : ' tắt ' + 'được máy lạnh',
    };
  }
  return {
    message: result.data?.message
  }
}
export async function getTempDashBoard(): Promise<HttpData<TempData[]>> {
  const result = await get('data/gettemperature?type=day');
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
    data: result?.data.data as TempData[],
    message: result?.data?.message,
  };
}
export async function getNotifications(): Promise<HttpData<Noti[]>> {
  const result = await get('data/getnotification');
  if (result?.error) {
    return result;
  }
  if (result.data?.message !== 'success') {
    return {
      error: 'api',
      message: 'Có lỗi xảy ra, không lấy được thông tin đèn',
    };
  }
  return {
    data: result?.data.notifications as Noti[],
    message: result?.data?.message,
  };
}