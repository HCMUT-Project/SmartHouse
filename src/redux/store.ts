import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './reducer/profile/user.reducer';
import snackBarReducer from './reducer/snackBarReducer';
import changePwdReducer from './reducer/profile/changePwd.reducer';
import userSignUpReducer from './reducer/profile/user.signUp.reducer';
import deviceReducer from './reducer/device/deviceReducer';
import tempReducer from './reducer/device/tempReducer';
import setFanReducer from './reducer/device/setFanReducer';
import setLightReducer from './reducer/device/setLightReducer';
import getTempsReducer from './reducer/device/getTempsReducer';
export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    snackBarReducer: snackBarReducer,
    changePwdReducer,
    userSignUpReducer,
    deviceReducer,
    tempReducer,
    setFanReducer,
    setLightReducer,
    getTempsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
