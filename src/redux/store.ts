import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './reducer/profile/user.reducer';
import snackBarReducer from './reducer/snackBarReducer';
import changePwdReducer from './reducer/profile/changePwd.reducer';
import userSignUpReducer from './reducer/profile/user.signUp.reducer';
import deviceReducer from './reducer/device/deviceReducer';
export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    snackBarReducer: snackBarReducer,
    changePwdReducer,
    userSignUpReducer,
    deviceReducer
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
