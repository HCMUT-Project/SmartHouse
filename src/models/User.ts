export interface UserModel {
  code: boolean;
  message: string;
  message1: number;
  calendarURL: string;
  hdHomeURL: string;
  fullName: string;
  linkMFA: string;
  isMFA: string;
  refreshToken: string;
  mapKey: string;
  medicalDescriptionLink: string;
  wfhRadius: string;
  email: string;
  dataELearning: {
    userId: number;
    userName: string;
    name: string;
    avarta: string;
    email: string;
    phone: string;
    gender: string;
    birthday: string;
    location: string;
  };
  enableElearning: boolean;
  elearningURL: string;
}
