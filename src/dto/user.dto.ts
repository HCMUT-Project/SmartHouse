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
  fullName: string;
  confirmPassword: string;
}