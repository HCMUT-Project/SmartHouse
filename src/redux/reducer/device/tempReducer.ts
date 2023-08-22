import { HttpData } from '../../../helpers/api.helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../../models/Status';
import { AppThunk } from '../../store';
import { getLed, getAir, getTemp } from '../../api/homeApi';
import { DeviceModel } from '../../../models/Devices';

export interface TempState {
    status: Status;
    message: string | undefined;
    data: undefined | string;
}
export const initState: TempState = {
    status: Status.idle,
    message: '',
    data: undefined
};
export const tempSlide = createSlice({
    name: 'tempSlide',
    initialState: initState,
    reducers: {
        status: (state: TempState, action: PayloadAction<Status>) => {
            state.status = action.payload;
        },
        reset: (state: TempState) => {
            state.status = Status.idle;
            state.message = '';
            state.data = '';
        },
        data: (state: TempState, action: PayloadAction<TempState>) => {
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.data = action.payload.data
        },
    },
});

export const getRoomDataAction = (): AppThunk =>
    async dispatch => {
        dispatch(tempSlide.actions.status(Status.loading));
        const result: HttpData<DeviceModel> = await getTemp();
        if (result.error) {
            dispatch(tempSlide.actions.data({
                status: Status.error,
                message: result.message,
                data: result.data?.value
            }))
        } else {
            dispatch(
                tempSlide.actions.data({
                    status: Status.success,
                    message: result.message,
                    data: undefined
                }),
            );
        }
    };
export const getRoomResetAction = (): AppThunk => async dispatch => {
    dispatch(tempSlide.actions.reset());
};
export default tempSlide.reducer;
