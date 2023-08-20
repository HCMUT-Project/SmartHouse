import {createNativeStackNavigator} from '@react-navigation/native-stack';

export enum MainRoutes {
  BottomBar = 'BottomBar',
  History = 'History',
  Dashboard = 'Dashboard',
  Profile = 'Profile',
  Login = 'Login',
  Register = 'Register',
}

export type MainStackParamList = {
  [MainRoutes.BottomBar]: undefined;
  [MainRoutes.History]: undefined;
  [MainRoutes.Dashboard]: undefined;
  [MainRoutes.Profile]: undefined;
  [MainRoutes.Register]: undefined;

  [MainRoutes.Login]: undefined;
};

export const MainStack = createNativeStackNavigator<MainStackParamList>();
