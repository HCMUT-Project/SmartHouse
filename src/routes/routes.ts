import { createNativeStackNavigator } from '@react-navigation/native-stack';

export enum MainRoutes {
  BottomBar = 'BottomBar',
  Home = 'Home',
  Dashboard = 'Dashboard',
  Profile = 'Profile',
  Login = 'Login',
  Register = 'Register',
  ChangePwd = 'ChangePwd',
  AppInformation = 'AppInformation',
  HomeDetail = 'HomeDetail'
}

export type MainStackParamList = {
  [MainRoutes.BottomBar]: undefined;
  [MainRoutes.Home]: undefined;
  [MainRoutes.Dashboard]: undefined;
  [MainRoutes.Profile]: undefined;
  [MainRoutes.Register]: undefined;

  [MainRoutes.Login]: undefined;
  [MainRoutes.ChangePwd]: undefined;
  [MainRoutes.AppInformation]: undefined;
  [MainRoutes.HomeDetail]: { name: string };
};

export const MainStack = createNativeStackNavigator<MainStackParamList>();
