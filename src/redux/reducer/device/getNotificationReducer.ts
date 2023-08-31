import { HttpData } from '../../../helpers/api.helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../../models/Status';
import { AppThunk } from '../../store';
import { getNotifications, getTempDashBoard } from '../../api/homeApi';
import { DeviceModel, Noti, TempData } from '../../../models/Devices';

export interface TempState {
    status: Status;
    message: string | undefined;
    data: undefined | Noti[];
}
export const initState: TempState = {
    status: Status.idle,
    message: '',
    data: undefined
};
export const listNotificationSlide = createSlice({
    name: 'listNotificationSlide',
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

export const getListNotificationAction = (): AppThunk =>
    async dispatch => {
        dispatch(listNotificationSlide.actions.status(Status.loading));
        const result: HttpData<Noti[]> = await getNotifications();
        console.log(result, "result")
        if (result.error) {
            dispatch(listNotificationSlide.actions.data({
                status: Status.error,
                message: result.message,
                data: undefined
            }))
        } else {
            dispatch(
                listNotificationSlide.actions.data({
                    status: Status.success,
                    message: result.message,
                    data: result.data
                }),
            );
        }
    };
export const resetListNotificationAction = (): AppThunk => async dispatch => {
    dispatch(listNotificationSlide.actions.reset());
};
export default listNotificationSlide.reducer;
