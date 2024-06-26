/**
 * @format
 */

import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { SnackBar } from './src/components/snackBar/SnackBar';
AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor="transparent" />
      <App />
      <SnackBar />
    </SafeAreaProvider>
  </Provider>
));
