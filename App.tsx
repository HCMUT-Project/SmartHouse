import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { BottomBar } from './src/components/bottomBar';
import { MainRoutes, MainStack } from './src/routes/routes';

// Main module
import Login from './src/module/login/Login';
import ProfileModule from './src/module/profile/ProfileModule';
import DashboardModule from './src/module/dashboard/DashboardModule';
import HomeModule from './src/module/home/HomeModule';
import Register from './src/module/login/Register';
import ChangePwdModule from './src/module/login/ChangePassword';
import AppInformation from './src/module/profile/AppInfomation';
import { useAppSelector } from './src/hooks';
import { stringIsEmpty } from './src/constants/Function';
import HomeDetail from './src/module/home/HomeDetailsModule';
const App = () => {
  const data = useAppSelector(state => state.userReducer.loginData);
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  React.useEffect(() => {
    if (!stringIsEmpty(data?.accessToken)) {
      setIsSignedIn(true)
    } else {
      setIsSignedIn(false)
    }
  }, [data]);

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName={MainRoutes.Login}>
        {isSignedIn ? (<>
          <MainStack.Screen
            name={MainRoutes.BottomBar}
            component={BottomBar}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.Home}
            component={HomeModule}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.Dashboard}
            component={DashboardModule}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.Profile}
            component={ProfileModule}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.ChangePwd}
            component={ChangePwdModule}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.AppInformation}
            component={AppInformation}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.HomeDetail}
            component={HomeDetail}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
        </>)
          : (<>
            <MainStack.Screen
              name={MainRoutes.Login}
              component={Login}
              options={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            />
            <MainStack.Screen
              name={MainRoutes.Register}
              component={Register}
              options={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            />
          </>)}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
