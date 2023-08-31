export interface DeviceModel {
    "id": string,
    "value": string,
    "feed_key": string
}
export interface TempData {
    "time": string,
    "data": string | number
}
export interface Noti {
    "feed": string,
    "createAt": string,
    "content": string,
}