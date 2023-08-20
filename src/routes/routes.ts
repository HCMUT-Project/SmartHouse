import {createNativeStackNavigator} from '@react-navigation/native-stack';

export enum MainRoutes {
  BottomBar = 'BottomBar',
  Module1 = 'Module1',
  Module2 = 'Module2',
  Login = 'Login',
}

export type MainStackParamList = {
  [MainRoutes.BottomBar]: undefined;
  [MainRoutes.Module1]: undefined;
  [MainRoutes.Module2]: undefined;
  [MainRoutes.Login]: undefined;
};

export const MainStack = createNativeStackNavigator<MainStackParamList>();
