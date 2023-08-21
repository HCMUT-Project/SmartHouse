import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import userReducer from './reducer/user.reducer';
import snackBarReducer from './reducer/snackBarReducer';
import changePwdReducer from './reducer/profile/changePwd.reducer';
import userSignUpReducer from './reducer/profile/user.signUp.reducer';
export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    snackBarReducer:snackBarReducer,
    changePwdReducer,
    userSignUpReducer

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
