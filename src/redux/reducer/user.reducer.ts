import {LoginDTO} from '../../dto';
import {HttpData} from '../../helpers/api.helper';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Status} from '../../models/Status';
import {UserModel} from '../../models';
import {AppThunk} from '../store';
import {loginAPI} from '../api/user.api';

interface LoginState {
  status: Status;
  loginData: UserModel | undefined;
  message: string;
}

const initialState: LoginState = {
  status: Status.idle,
  loginData: undefined,
  message: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (
      state: LoginState,
      action: PayloadAction<UserModel | undefined>,
    ) => {
      state.loginData = action.payload;
      state.status = Status.success;
    },
    message: (state: LoginState, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    status: (state: LoginState, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
});

export const loginAction =
  ({...input}: LoginDTO): AppThunk =>
  async dispatch => {
    dispatch(userSlice.actions.status(Status.loading));
    const result: HttpData<UserModel> = await loginAPI(input);
    if (result.error) {
      dispatch(userSlice.actions.status(Status.error));
      dispatch(userSlice.actions.message(result?.message));
    } else {
      dispatch(userSlice.actions.login(result?.data));
      dispatch(userSlice.actions.message(result?.message));
    }
  };

export const {login} = userSlice.actions;

// export const selectUser = (state: RootState) => state.userReducer;

export default userSlice.reducer;
