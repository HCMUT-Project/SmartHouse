import { LoginDTO } from '../../../dto';
import { HttpData } from '../../../helpers/api.helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../../models/Status';
import { LoginModel } from '../../../models';
import { AppThunk } from '../../store';
import { loginAPI } from '../../api/user.api';
import { userData } from '../../../configs';
export interface ApiState {
  status: Status;
  message: string;
}
export const initState: ApiState = {
  status: Status.idle,
  message: ''
};
export interface ApiModel {
  error: boolean | string | undefined;
  message: string;
}
export interface LoginState extends ApiState {
  loginData: LoginModel | undefined;
}
export const initialState: LoginState = {
  ...initState,
  loginData: undefined,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state: LoginState, action: PayloadAction<LoginState>) => {
      state.message = action.payload.message;
      state.loginData = action.payload.loginData;
      state.status = action.payload.status;
    },
    status: (state: LoginState, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    resetLogin: (state: LoginState) => {
      state.message = '';
      state.status = Status.idle;
      state.loginData = undefined;
      userData.accessToken = '';
      userData.name = '';
      userData.email = '';
      userData.phoneNumber = '';
      userData.id = '';
      userData.avatar = '';
    },
  },
});

export const loginAction =
  ({ ...input }: LoginDTO): AppThunk =>
    async dispatch => {
      dispatch(userSlice.actions.status(Status.loading));
      const result: HttpData<LoginModel> = await loginAPI(input);
      if (result.error) {
        dispatch(
          userSlice.actions.login({
            loginData: undefined,
            message: result.message,
            status: Status.error,
          }),
        );
      } else {
        if (result.data) {
          userData.accessToken = result.data?.accessToken;
          userData.name = result.data?.name;
          userData.email = result.data?.email;
          userData.phoneNumber = result.data?.phoneNumber;
          userData.id = result.data?.id;
          userData.avatar = result.data?.avatar;
        }
        dispatch(
          userSlice.actions.login({
            loginData: result?.data,
            message: result.message,
            status: Status.success,
          }),
        );
      }
    };

export const logOutAction = (): AppThunk => async dispatch => {
  dispatch(userSlice.actions.resetLogin());
};
export const { login } = userSlice.actions;

export default userSlice.reducer;
