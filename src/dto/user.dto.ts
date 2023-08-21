export interface LoginDTO {
  email: string;
  password: string;
}
export interface ChangePwdDTO {
  oldPassword: string;
  newPassword: string;
}
export interface SignUpDTO {
  phoneNumber: string;
  password: string;
  email: string;
  name: string;
  photoURL: string
}