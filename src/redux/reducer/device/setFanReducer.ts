import { HttpData } from '../../../helpers/api.helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../../models/Status';
import { AppThunk } from '../../store';
import {  setFan } from '../../api/homeApi';
import { DeviceModel } from '../../../models/Devices';

export interface TempState {
    status: Status;
    message: string | undefined;
}
export const initState: TempState = {
    status: Status.idle,
    message: '',
};
export const fanSlide = createSlice({
    name: 'fanSlide',
    initialState: initState,
    reducers: {
        status: (state: TempState, action: PayloadAction<Status>) => {
            state.status = action.payload;
        },
        reset: (state: TempState) => {
            state.status = Status.idle;
            state.message = '';
        },
        data: (state: TempState, action: PayloadAction<TempState>) => {
            state.status = action.payload.status;
            state.message = action.payload.message;
        },
    },
});

export const setFanAction = (isOn: boolean): AppThunk =>
    async dispatch => {
        dispatch(fanSlide.actions.status(Status.loading));
        const result: HttpData<DeviceModel> = await setFan(isOn);
        if (result.error) {
            dispatch(fanSlide.actions.data({
                status: Status.error,
                message: result.message,
            }))
        } else {
            dispatch(
                fanSlide.actions.data({
                    status: Status.success,
                    message: result.message,
                }),
            );
        }
    };
export const resetSetFanAction = (): AppThunk => async dispatch => {
    dispatch(fanSlide.actions.reset());
};
export default fanSlide.reducer;
