import { HttpData } from '../../../helpers/api.helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../../models/Status';
import { AppThunk } from '../../store';
import { getTempDashBoard } from '../../api/homeApi';
import { DeviceModel, TempData } from '../../../models/Devices';

export interface TempState {
    status: Status;
    message: string | undefined;
    data: undefined | TempData[];
}
export const initState: TempState = {
    status: Status.idle,
    message: '',
    data: undefined
};
export const listTempSlide = createSlice({
    name: 'listTempSlide',
    initialState: initState,
    reducers: {
        status: (state: TempState, action: PayloadAction<Status>) => {
            state.status = action.payload;
        },
        reset: (state: TempState) => {
            state.status = Status.idle;
            state.message = '';
            state.data = undefined
        },
        data: (state: TempState, action: PayloadAction<TempState>) => {
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.data = action.payload.data
        },
    },
});

export const getListTempAction = (): AppThunk =>
    async dispatch => {
        dispatch(listTempSlide.actions.status(Status.loading));
        const result: HttpData<TempData[]> = await getTempDashBoard();
        if (result.error) {
            dispatch(listTempSlide.actions.data({
                status: Status.error,
                message: result.message,
                data: undefined
            }))
        } else {
            dispatch(
                listTempSlide.actions.data({
                    status: Status.success,
                    message: result.message,
                    data: result.data
                }),
            );
        }
    };
export const resetListTempAction = (): AppThunk => async dispatch => {
    dispatch(listTempSlide.actions.reset());
};
export default listTempSlide.reducer;
