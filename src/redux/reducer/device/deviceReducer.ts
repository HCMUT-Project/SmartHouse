import { SignUpDTO } from '../../../dto';
import { HttpData } from '../../../helpers/api.helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../../models/Status';
import { AppThunk } from '../../store';
import { getLed, getAir } from '../../api/homeApi';
import { DeviceModel } from '../../../models/Devices';
import { stringIsEmpty } from '../../../constants/Function';


export interface DeviceState {
    status: Status;
    message: string | undefined;
    messageLed: string | undefined;
    dataAir: undefined | string;
    dataLed: undefined | string;
}
export const initState: DeviceState = {
    status: Status.idle,
    message: '',
    messageLed: '',
    dataAir: undefined,
    dataLed: undefined
};
export const deviceSlide = createSlice({
    name: 'deviceSlide',
    initialState: initState,
    reducers: {
        status: (state: DeviceState, action: PayloadAction<Status>) => {
            state.status = action.payload;
        },
        reset: (state: DeviceState) => {
            state.status = Status.idle;
            state.message = '';
        },
        data: (state: DeviceState, action: PayloadAction<DeviceState>) => {
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.dataLed = !stringIsEmpty(action.payload.dataLed) ? action.payload.dataLed : state.dataLed
            state.dataAir = !stringIsEmpty(action.payload.dataAir) ? action.payload.dataAir : state.dataAir
        },
    },
});

export const getRoomDataAction = (): AppThunk =>
    async dispatch => {
        dispatch(deviceSlide.actions.status(Status.loading));
        const resultAir: HttpData<DeviceModel> = await getAir();
        const resultLed: HttpData<DeviceModel> = await getLed();
        if (resultAir.error || resultLed.error) {
            dispatch(deviceSlide.actions.data({
                status: Status.error,
                message: resultAir.message,
                messageLed: resultLed.message,
                dataLed: resultLed.data?.value,
                dataAir: resultAir.data?.value
            }))
        } else {
            dispatch(
                deviceSlide.actions.data({
                    status: Status.success,
                    message: resultAir.message,
                    messageLed: resultLed.message,
                    dataAir: resultAir.data?.value,
                    dataLed: resultLed.data?.value
                }),
            );
        }
    };
export const getRoomResetAction = (): AppThunk => async dispatch => {
    dispatch(deviceSlide.actions.reset());
};
export default deviceSlide.reducer;
