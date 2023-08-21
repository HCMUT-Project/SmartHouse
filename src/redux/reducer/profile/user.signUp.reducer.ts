import { SignUpDTO } from '../../../dto';
import { HttpData } from '../../../helpers/api.helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../../models/Status';
import { AppThunk } from '../../store';
import { ApiModel, ApiState, initState } from '../profile/user.reducer';
import { signUpAPI } from '../../api/user.api';

export const signUpSlice = createSlice({
  name: 'signUpSlice',
  initialState: initState,
  reducers: {
    status: (state: ApiState, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    reset: (state: ApiState) => {
      state.status = Status.idle;
      state.message = '';
    },
    data: (state: ApiState, action: PayloadAction<ApiState>) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
});

export const signUpAction =
  ({ ...input }: SignUpDTO): AppThunk =>
    async dispatch => {
      dispatch(signUpSlice.actions.status(Status.loading));
      const result: HttpData<ApiModel> = await signUpAPI(input);
      if (result.error) {
        dispatch(
          signUpSlice.actions.data({
            status: Status.error,
            message: result.message,
          }),
        );
      } else {
        dispatch(
          signUpSlice.actions.data({
            status: Status.success,
            message: result.message,
          }),
        );
      }
    };
export const signUpResetAction = (): AppThunk => async dispatch => {
  dispatch(signUpSlice.actions.reset());
};
export default signUpSlice.reducer;
