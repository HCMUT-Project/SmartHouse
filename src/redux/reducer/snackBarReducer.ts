import {AppThunk} from './../store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SnackBarType} from '../../components/snackBar/SnackBar';

interface PeriodState {
  message: string | undefined;
  type?: keyof typeof SnackBarType | undefined;
  timeout?: NodeJS.TimeOut;
}

const initialState: PeriodState = {
  message: undefined,
  type: undefined,
  timeout: undefined,
};

export const snackBarSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    message: (state: PeriodState, action: PayloadAction<PeriodState>) => {
      state.message = action?.payload?.message;
      if (action?.payload?.type) {
        state.type = action?.payload?.type;
      }
    },
    reset: () => initialState,
  },
});

export const setSnackBarMessage =
  (message: string, type: keyof typeof SnackBarType | undefined): AppThunk =>
  async (dispatch, getState) => {
    const {timeout} = getState().snackBarReducer;
    clearTimeout(timeout);
    dispatch(snackBarSlice.actions.reset());
    let newTimeout = setTimeout(() => {
      dispatch(snackBarSlice.actions.reset());
    }, 3500);

    dispatch(
      snackBarSlice.actions.message({
        message,
        type,
        timeout: newTimeout,
      }),
    );
    // clearTimeout(timeout);
  };

export default snackBarSlice.reducer;
