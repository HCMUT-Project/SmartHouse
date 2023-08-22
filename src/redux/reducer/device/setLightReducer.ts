import { HttpData } from '../../../helpers/api.helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../../models/Status';
import { AppThunk } from '../../store';
import {  setFan, setLed } from '../../api/homeApi';
import { DeviceModel } from '../../../models/Devices';

export interface TempState {
    status: Status;
    message: string | undefined;
}
export const initState: TempState = {
    status: Status.idle,
    message: '',
};
export const lightSlide = createSlice({
    name: 'lightSlide',
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

export const setLedAction = (isOn: boolean): AppThunk =>
    async dispatch => {
        dispatch(lightSlide.actions.status(Status.loading));
        const result: HttpData<DeviceModel> = await setLed(isOn);
        if (result.error) {
            dispatch(lightSlide.actions.data({
                status: Status.error,
                message: result.message,
            }))
        } else {
            dispatch(
                lightSlide.actions.data({
                    status: Status.success,
                    message: result.message,
                }),
            );
        }
    };
export const resetSetLedAction = (): AppThunk => async dispatch => {
    dispatch(lightSlide.actions.reset());
};
export default lightSlide.reducer;
