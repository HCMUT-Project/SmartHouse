import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainRoutes, MainStackParamList} from './routes';

export type MainNavigationProp<
  RouteName extends keyof MainStackParamList = MainRoutes,
> = NativeStackScreenProps<MainStackParamList, RouteName>;
