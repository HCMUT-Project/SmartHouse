import {ChangePwdDTO} from '../../../dto';
import {HttpData} from '../../../helpers/api.helper';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Status} from '../../../models/Status';
import {UserModel} from '../../../models';
import {AppThunk} from '../../store';
import {changePwdAPI} from '../../api/user.api';
import {ApiState, initState} from './user.reducer';

export const changePwdSlice = createSlice({
  name: 'changePwd',
  initialState: initState,
  reducers: {
    message: (state: ApiState, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    status: (state: ApiState, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    reset: (state: ApiState) => {
      state.status = Status.idle;
      state.message = '';
    },
  },
});
export const changePwdAction =
  ({...input}: ChangePwdDTO): AppThunk =>
  async dispatch => {
    dispatch(changePwdSlice.actions.status(Status.loading));
    const result: HttpData<UserModel> = await changePwdAPI(input);
    if (result.error) {
      dispatch(changePwdSlice.actions.status(Status.error));
      dispatch(changePwdSlice.actions.message(result?.message));
    } else {
      dispatch(changePwdSlice.actions.message(result?.message));
      dispatch(changePwdSlice.actions.status(Status.success));
    }
  };

export const resetStatusChangePwd = (): AppThunk => async dispatch => {
  dispatch(changePwdSlice.actions.reset());
};
export default changePwdSlice.reducer;
